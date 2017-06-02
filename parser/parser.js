var Parser = {
        _skipWhitespace: function(s) {
                while (s.value[s.c] == ' ' || s.value[s.c] == '\n' || s.value[s.c] == '\t')
                        s.c++;
        },
        _match: function(s, str) {
                if (s.value.substr(s.c).toLowerCase().indexOf(str) == 0 &&
                        (s.value.substr(s.c).length == str.length ||
                         s.value.substr(s.c)[str.length] == ',' ||
                         s.value.substr(s.c)[str.length] == ' ' ||
                         s.value.substr(s.c)[str.length] == '\n' ||
                         s.value.substr(s.c)[str.length] == '\t')) {
                        
                        s.c += str.length;
                        return true;
                }
                return false;
        },
        _parse: function(t, s, p) {

                var c = s.c;
                Parser._skipWhitespace(s);
                
                var items = [];

                for (var j = 0; j < BNF[t].length; j++) {
                        var c0 = s.c;

                        
                        var types = BNF[t][j].split(' ');
                        
                        var temps = [];
                        
                        
                        var old_items = [];
                        
                        var success = true;
                        var type = null;
                        
                        for (var k = 0; k < types.length; k++) {
                        
                                type = types[k];
                                var sc = {success:false};
                                
                                if (typeof(BNF[type]) == 'undefined') {
                                        Parser._skipWhitespace(s);
                                        if (sc.success = Parser._match(s, type.replace("_", " ").toLowerCase()))
                                                temps.push(type);
                                } else {
                                        sc = Parser._parse(type, s, /OBJECT/.test(t) ? t : p);
                                        if (sc.success) {
                                                temps.push(sc.string);
                                                old_items = old_items.concat(sc.new_items);
                                        }
                                }
                                
                                if (!sc.success) {
                                        success = false;
                                        break;
                                }
                        }
                        
                        if (success && t == "COMMAND") {
                                Parser._skipWhitespace(s);
                                if (s.c != s.value.length)
                                        success = false;
                        }
                        
                        if (success) {
                                var string = temps.join(" ");
                                var new_items = [];
                                new_items.push({type:t,value:string,class:BNF[t][j],parent:p});
                                new_items = new_items.concat(old_items);
                                
                                return {success:true, string:string, new_items:new_items};
                        }
                        
                        
                                
                        s.c = c0;
                }
                
                s.c = c;
                return {success:false};
        },
        _wrapper: function(s) {
                var res = Parser._parse("COMMAND", s, "");
                if (res.success) {
                        Parser._skipWhitespace(s);
                        if (s.c == s.value.length) {
                                Parser.last_string = s.original;
                                Parser.last_command = res.new_items;
                                return {success:true, str:s.original, command:res.new_items};
                        } else {
                                Parser.last_string = s.original;
                                Parser.last_command = null;
                                return {success:false, str:s.original, command:null};
                        }
                } else {
                        Parser.last_string = s.original;
                        Parser.last_command = null;
                        return {success:false, str:s.original, command:null};
                }
        },
        
        
        getPValue: function(parent, type, res) {
                var r = typeof(res) != 'undefined' ? res : Parser.last_command;
                for (var j = 0; j < r.length; j++)
                        if (r[j].type == type && r[j].parent == parent)
                                return r[j].value;
                return null;
        },
        getPArray: function(parent, type, res) {
                var r = typeof(res) != 'undefined' ? res : Parser.last_command;
                var list = [];
                for (var j = 0; j < r.length; j++)
                        if (r[j].type == type && r[j].parent == parent)
                                list.push(r[j].value);
                return list;
        },
        
        getClass: function(type, res) {
                var r = typeof(res) != 'undefined' ? res : Parser.last_command;
                for (var j = 0; j < r.length; j++)
                        if (r[j].type == type)
                                return r[j].class;
                return null;
        },
        getValue: function(type, res) {
                var r = typeof(res) != 'undefined' ? res : Parser.last_command;
                for (var j = 0; j < r.length; j++)
                        if (r[j].type == type)
                                return r[j].value;
                return null;
        },
        getArray: function(type, res) {
                var r = typeof(res) != 'undefined' ? res : Parser.last_command;
                var list = [];
                for (var j = 0; j < r.length; j++)
                        if (r[j].type == type)
                                list.push(r[j].value);
                return list;
        },
        

        last_string:null,
        last_command:null,
        
        parse: function(str) {
                return Parser._wrapper({original:str, value:str.replace(/,/g, " , ").replace(/\s\s/g, " "), c:0});
        }
        
};