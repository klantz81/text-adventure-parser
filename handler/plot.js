var Plot = {
        notices:[],
        events:[],
        tmp:0,
        notice: function(i) {
                var b = Plot.notices.indexOf(i) > -1;
                if (!b)
                        Plot.notices.push(i);
                return b;
        },
        update: function() {
                var list = [];
                for (var j = 0; j < Plot.events.length; j++) {
                        if (typeof(Plot.events[j].moves) != 'undefined') {
                                if (Plot.events[j].moves == 0) {
                                        if (typeof(Plot.events[j].handler) != 'undefined')
                                                list.push(Plot.events[j].handler());
                                        else
                                                list.push(Plot.events[j].text);
                                }
                                Plot.events[j].moves--;
                        } else {
                                if (Plot.events[j].condition() && !Plot.notice(Plot.events[j].i)) {
                                        if (typeof(Plot.events[j].handler) != 'undefined')
                                                list.push(Plot.events[j].handler());
                                        else
                                                list.push(Plot.events[j].text);
                                }
                        }
                }
                
                
                return list.join("<br><br>");
        },
        createTextEvent: function(moves, text) {
                Plot.events.push({moves:moves, text:text});
        },
        createHandlerEvent: function(moves, handler) {
                Plot.events.push({moves:moves, handler:handler});
        },
        createConditionalText: function(condition, text) {
                Plot.events.push({condition:condition, i:Plot.tmp++, text:text});
        },
        createConditionalHandler: function(condition, handler) {
                Plot.events.push({condition:condition, i:Plot.tmp++, handler:handler});
        }
};
