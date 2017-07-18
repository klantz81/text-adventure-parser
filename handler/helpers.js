function pluralize(noun) {
        var n = "";
        
        if (/cs$/.test(noun))
                n = noun;
        else if (/ey$/.test(noun) || /ay$/.test(noun))
                n = noun+"s";
        else if (/y$/.test(noun))
                n = noun.replace(/y$/, 'ies');
        else if (/s$/.test(noun))
                n = noun+"es";
        else n = noun+"s";
        
        return n;
}

function aAnThe(the, next) {
        if (the == "") return next;
        if (the == "The") return "The "+next;
        if (the == "the") return "the "+next;
        if (the == "a" || the == "an") return (["a","e","i","o","u"].indexOf(next[0].toLowerCase()) == -1 ? "a " : "an ") + next;
}

function theNoun(noun, adjectives, the) {
        if (typeof(adjectives) == 'undefined' || adjectives.length < 1)
                return aAnThe(the, noun.replace(/_/g, " "));
        
        return aAnThe(the, adjectives.join(" ")+" "+noun.replace(/_/g, " "));
}

function getNumber(str) {
        if (/(ten|10)/i.test(str))
                return 10;
        if (/(nine|9)/i.test(str))
                return 9;
        if (/(eight|8)/i.test(str))
                return 8;
        if (/(seven|7)/i.test(str))
                return 7;
        if (/(six|6)/i.test(str))
                return 6;
        if (/(five|5)/i.test(str))
                return 5;
        if (/(four|4)/i.test(str))
                return 4;
        if (/(three|3)/i.test(str))
                return 3;
        if (/(two|2)/i.test(str))
                return 2;
        if (/(one|1)/i.test(str))
                return 1;
        return 0;
}

function whichNoun(objects) {
	var arr = [];
	for (var j = 0; j < objects.length; j++) {
		var joiner = "";
		if (j == objects.length - 1) {
		} else if (objects.length == 2) {
			joiner = " or ";
		} else if (objects.length > 2) {
			if (j == objects.length - 2) {
				joiner = ", or ";
			} else {
				joiner = ", ";
			}
		}
		arr.push(theNoun(Objects[objects[j]].nouns[0], Objects[objects[j]].adjectives, "the") + joiner);
	}

	return "Did you mean "+arr.join("")+"?";
}

function list(obj, prepend) {
        prepend = typeof(prepend) == 'undefined' ? "" : prepend;
        
        var list = [];
        
	if (typeof(obj) != "object")
                obj = Objects[obj];
        
        if (obj.type == "room") {
                for (var j in Characters) {
                        if (Characters[j].location == obj.id && Characters[j].nouns[0] != 'player') {
                                list.push("&nbsp;&nbsp;&nbsp;&nbsp;"+theNoun(Characters[j].nouns[0], [], "")+" is here.<br>");
                        }
                }
        }
        
        for (var j = 0; j < obj.objects.length; j++) {
                if (!Objects[obj.objects[j]].hidden) {
                        list.push("&nbsp;&nbsp;&nbsp;&nbsp;There is "+theNoun(Objects[obj.objects[j]].nouns[0], Objects[obj.objects[j]].adjectives, "a")+//".<br>");
                                (Objects[obj.objects[j]].subtype == "container" ?
                                        (Objects[obj.objects[j]].opened ? " (open) containing:" : " (closed).") :
                                        (Objects[obj.objects[j]].subtype == "clothing" && Objects[obj.objects[j]].wearing ? " (wearing)." : "."))+"<br>");
                        
                        if (Objects[obj.objects[j]].subtype == "container" && Objects[obj.objects[j]].opened)
                                list.push(smalllist(Objects[obj.objects[j]], prepend + "&nbsp;&nbsp;&nbsp;&nbsp;"));
                }
        }
        
        return list.join("");
}

function smalllist(obj, prepend) {
        prepend = typeof(prepend) == 'undefined' ? "" : prepend;
        
        var list = [];
        
	if (typeof(obj) != "object")
                obj = Objects[obj];

        for (var j = 0; j < obj.objects.length; j++) {
                list.push(prepend+"&nbsp;&nbsp;&nbsp;&nbsp;"+theNoun(Objects[obj.objects[j]].nouns[0], Objects[obj.objects[j]].adjectives, "a")+
                        (Objects[obj.objects[j]].subtype == "container" ? (Objects[obj.objects[j]].opened ? " (open) containing:" : " (closed)") : (Objects[obj.objects[j]].subtype == "clothing" && Objects[obj.objects[j]].wearing ? " (wearing)" : ""))+"<br>");
                
                if (Objects[obj.objects[j]].subtype == "container" && Objects[obj.objects[j]].opened)
                        list.push(smalllist(Objects[obj.objects[j]], prepend + "&nbsp;&nbsp;&nbsp;&nbsp;"));
        }
        
        if (list.length == 0)
                list.push(prepend+"&nbsp;&nbsp;&nbsp;&nbsp;nothing<br>");
	
        return list.join("");
}



function getParent(obj) {
        for (var j in Objects) {
                for (var k = 0; k < Objects[j].objects.length; k++) {
                        if (Objects[j].objects[k] == obj)
                                return Objects[j];
                }
        }
        
        for (var j = 0; j < target.objects.length; j++)
                if (target.objects[j] == obj)
                        return target;
        
        return null;
}

function get(obj, dest) {
        var p = getParent(obj);

        if (typeof(dest) != 'undefined') {
                if (!Objects[dest].has(obj) && p || Objects[dest].has(obj) && p && p.id != dest) {
                        
                     Objects[dest].objects.push(obj);
                     
                     p.objects.splice(p.objects.indexOf(obj), 1);
                }
        } else if (!target.has(obj) && p || target.has(obj) && p && p.id != target.id) {
		target.objects.push(obj);
		
                p.objects.splice(p.objects.indexOf(obj), 1);
        }
}

function drop(obj, dest) {
        var p = getParent(obj);
        
	if (target.has(obj) && p) {
                p.objects.splice(p.objects.indexOf(obj), 1);
        
                if (typeof(dest) != 'undefined')
                        Objects[dest].objects.push(obj);
                else
                        Objects[target.location].objects.push(obj);
        }
}

function attack(obj) {
	Objects[target.location].objects.push("goblin_corpse");
	for (var j in Objects) {
                for (var k = 0; k < Objects[j].objects.length; k++) {
                        if (Objects[j].objects[k] == obj) {
                                Objects[j].objects.splice(k, 1);
                                return;
                        }
                }
	}

}

function objectMatches(id, noun, adjectives) {
        var obj = Objects[id];

        if (obj.nouns.indexOf(noun) == -1 && obj.plural_nouns.indexOf(noun) == -1 && noun != "all" && noun != "everything" && noun != "it" && noun != "one" && noun != "them" && noun != "ones")
                return false;
        
        if (adjectives.length > 0) {
                for (var j = 0; j < adjectives.length; j++)
                        if (obj.adjectives.indexOf(adjectives[j]) == -1 && obj.unlisted_adjectives.indexOf(adjectives[j]) == -1)
                                return false;
        }

        return true;
}

function findObjectsOnTarget(optional_target, include_children) {
        var list = [];

        function loop(obj) {
                for (var j = 0; j < obj.objects.length; j++) {
                        list.push(obj.objects[j]);

                        if (Objects[obj.objects[j]].opened)
                                loop(Objects[obj.objects[j]]);
                }
        }

        loop(typeof(optional_target) != 'undefined' ? optional_target : target);

        return list;
}

function findObjectsInRoom() {
        var list = [];

        function loop(obj) {
                for (var j = 0; j < obj.objects.length; j++) {
                        list.push(obj.objects[j]);

                        if (Objects[obj.objects[j]].opened)
                                loop(Objects[obj.objects[j]]);
                }
        }

        loop(Objects[target.location]);

        return list;
}

function findObjects(noun, adjectives, obj) {
        var list = [];

        function loop(obj) {
                if (obj.opened) {
                        for (var j = 0; j < obj.objects.length; j++) {
                                if (objectMatches(obj.objects[j], noun, adjectives)) {
                                        list.push(obj.objects[j]);
                                }

                                if (Objects[obj.objects[j]].opened)
                                        loop(Objects[obj.objects[j]]);
                        }
                }
        }
        
        if (typeof(obj) != 'undefined')
                loop(Objects[obj]);
        else {
                loop(target);
                loop(Objects[target.location]);
                
                if (objectMatches(target.location, noun, adjectives))
                        list.push(target.location);
                
                var characters = findCharacters(noun, adjectives);
                for (var j = 0; j < characters.length; j++)
                        list.push(characters[j]);
        }

        return list;
}

function findCharacters(noun, adjectives) {

        var list = [];

        for (var j in Characters) {
                if (Characters[j].location == Characters.Player.location) {
                        if (objectMatches(j, noun, adjectives)) {
                                list.push(j);
                        }
                }
        }

        return list;
}

function removeAdjective(adjectives, adjective) {
        if (adjectives.indexOf(adjective) != -1)
                adjectives.splice(adjectives.indexOf(adjective), 1);
}

function addAdjective(adjectives, adjective) {
        if (adjectives.indexOf(adjective) == -1)
                adjectives.push(adjective);
}

function modifyAdjectives(adjectives, adjective) {
        if (adjective == "open") {
                removeAdjective(adjectives, "closed");
                addAdjective(adjectives, "open");
        } else if (adjective == "closed") {
                removeAdjective(adjectives, "open");
                addAdjective(adjectives, "closed");
        } else if (adjective == "unlocked") {
                removeAdjective(adjectives, "locked");
                addAdjective(adjectives, "unlocked");
        } else if (adjective == "locked") {
                removeAdjective(adjectives, "unlocked");
                addAdjective(adjectives, "locked");
        }
}
