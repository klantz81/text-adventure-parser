var title = "A Test Story";
var author = "K Lantz";

addCharacter("Player", {
        location: "galley",
        nouns: ["player","me"],
        adjectives: [],
});

addCharacter("Ashton", {
        location: "galley",
        nouns: ["Ashton_Kirkland","Ashton","Kirkland"],
        adjectives: [],
        talk: function() {
                return "Ashton shrugs his shoulders before continuing with his work.";
        }
});

var Player = Objects.Player;
var target = Objects.Player;





addRoom("galley", {
        title:"Galley",
        inspect:function() { return "The galley is a confined space capable of supporting but two or three people.  An airlock to port provides access to the external part of the ship. "+
                                        "The hydroponics bay lies to starboard through "+(Objects.door.opened?"an open":"a closed")+" door.  A large ornate box lies upon the countertop, "+
                                        "and a small chest lies hidden in the corner. A computer monitor flickers.<br>"+list("galley"); },
          
        starboard_door:"door",
        starboard:"hydroponics",
        
        port_door:"inner_door",
        port:"airlock",
        
        nouns:["galley",'room'],
        adjectives:["small"],
        
        objects:["large_box","small_chest","small_sword","bag","green_keycard","yellow_keycard","red_keycard","purple_keycard","door","inner_door","monitor","suit","airlock_reference"]//,"ashton"]
});

addRoom("hydroponics", {
        title:"Hydroponics",
        inspect:function() { return "The hydroponics bay is massive and lit by artificial lighting. "+
                                        "The galley lies to port through "+(Objects.door.opened?"an open":"a closed")+" door.<br>"+list("hydroponics"); },
        port_door:"door",
        port:"galley",
        
        nouns:["hydroponics",'room'],
        objects:["lamp","lamp2","goblin","blue_keycard","door"]
});

addRoom("airlock", {
        title:"Airlock",
        inspect:function() { return "You are in an airlock.  Space lies beyond the outer airlock door to port.  The inner airlock door lies to starboard.<br>"+list("airlock"); },
          
  //      port_door:"outer_door",
//        port:"space",
        
        starboard_door:"inner_door",
        starboard:"galley",
        
        nouns:["airlock"],
        adjectives:[],
        
        objects:["inner_door","outer_door"],
        
        exit:function() {
                if (Objects.inner_door.opened) {
                        target.location = "galley";
                        return Handler.inspect(true);
                } else {
                        return "You should open the inner airlock door first.";
                }
        }
});


addDoor("door", {
        nouns:["door"],
        adjectives:["rigid"],
        opened:false,
        locked:true,
        hidden:true,
        key:"yellow_keycard"
});

addDoor("inner_door", {
        nouns:["door"],
        open:function() {
                if (Objects.outer_door.opened)
                        return "You should close the outer door first.";
                Objects.inner_door.opened = true;
                modifyAdjectives(Objects.inner_door.unlisted_adjectives, Objects.inner_door.opened ? "open" : "closed");
                return "Done.";
        },
        adjectives:["inner","airlock"],
        hidden:true,
        opened:false
});

addDoor("outer_door", {
        nouns:["door"],
        open:function() {
                if (Objects.inner_door.opened)
                        return "You should close the inner door first.";
                Objects.outer_door.opened = true;
                modifyAdjectives(Objects.outer_door.unlisted_adjectives, Objects.outer_door.opened ? "open" : "closed");
                return "Done.";
        },
        adjectives:["outer","airlock"],
        hidden:true,
        opened:false
});

addContainer("small_chest", {
        nouns:["chest"],
        adjectives:["small"],
	hidden:true,
        opened:false,
        objects:["goblin_corpse"],
        drop:function() { Objects.small_chest.opened = true; return "Okay, so that's one way to do it.<br>"+Objects.small_chest.inspect(); },
        
        get:function() { return "You could probably carry it, but it wouldn't do you any good."; }
});


addRoom("airlock_reference", {
        nouns:["airlock"],
        adjectives:[],
        
        open:function() {
                return Objects.inner_door.open();
        },
        enter:function() {
                if (target.location == "galley") {
                        if (Objects.inner_door.opened) {
                                target.location = "airlock";
                                return Handler.inspect(true);
                        } else {
                                return "You should open the inner airlock door first.";
                        }
                } else if (target.location == "space") {
                        if (Objects.outer_door.opened) {
                                target.location = "airlock";
                                return Handler.inspect(true);
                        } else {
                                return "You should open the outer airlock door first.";
                        }
                }
        }
});

addContainer("large_box", {
        locked:true,
        key:"blue_keycard",
        nouns:["box"],
        adjectives:["large","ornate"],
	hidden:true,
        locked:true,
        opened:false,
        objects:["sword"],
});




        
addItem('monitor', {
        inspect:function() { return "The display is flickering. It says something...  "+(Objects.monitor.objects.length > 0 ? "And there is something beneath the monitor..." : ""); },
        read:function() { return "The display contains an unintelligible set of symbols."; },
        nouns:["monitor","computer","display"],
        adjectives:["flickering","computer"],
        look_under:function() { return Objects.monitor.objects.length > 0 ? "There is a folder beneath the monitor." : "There is nothing there."; },
        objects:["folder"],
        get:function() { return "It's fastened securely to the wall."; }
});

addItem('folder', {
        inspect:function() { return "The contents are indecipherable."; },
        read:function() { return "The contents are indecipherable."; },
        nouns:['folder'],
        hidden:true
});

addItem('small_sword', {
        inspect:function() { return "It is a small sword..."; },
        nouns:["sword"],
        adjectives:["small"]
});

addItem('bag', {
        subtype:"container",
        nouns:["bag"],
        adjectives:["worn"],
        opened:false,
        objects:[],
        get:function() { get("bag"); return "It appears to be worthless... maybe."; }
});
addItem('blue_keycard', {
        nouns:["card","keycard","key"],
        adjectives:["blue","access"],
        get:function() { get("blue_keycard"); return "It shimmers a bit as you put it in your pocket."; }
});
addItem('yellow_keycard', {
        nouns:["card","keycard","key"],
        adjectives:["yellow","access"]
});
addItem('green_keycard', {
        nouns:["card","keycard","key"],
        adjectives:["green","access"]
});
addItem('red_keycard', {
        nouns:["card","keycard","key"],
        adjectives:["red","access"]
});
addItem('purple_keycard', {
        nouns:["card","keycard","key"],
        adjectives:["purple","access"]
});

addItem('suit', {
        subtype:'clothing',
        nouns:["spacesuit","space_suit","suit"],
        adjectives:[],
        wearing:false,
        turn_on:function() {
                if (Objects.suit.wearing)
                        return "Lights begin flashing in a pattern representing the boot up procedure.  A few lights remain off indicating damage to the suit.";
                else
                        return "You should put it on first.";
        },
        turn_off:function() {
                if (Objects.suit.wearing)
                        return "The lights are extinguished.";
                else
                        return "You should put it on first.";
        }
});

addItem('lamp', {
        inspect:"It is a big green lamp.",
        nouns:["lamp","light","lantern"],
        adjectives:["big","green"]
});

addItem('lamp2', {
        inspect:"It is a big blue lamp.",
        nouns:["lamp","light","lantern"],
        adjectives:["big","blue"]
});

addItem('sword', {
        inspect:"It is an alien sword.",
        nouns:["sword"],
        adjectives:["alien"],
        get:function() { get("sword"); return "The sword shimmers in the light."; }
});

addItem("goblin_corpse", {
        nouns:["corpse"],
        adjectives:["bloody","goblin"],
        get:function() { return "What do you plan to do with the corpse?"; }
});

addItem("goblin", {
        inspect:function() { return "It is a small green goblin."; },
        nouns:["goblin"],
        adjectives:["small","green"],
        get:function() { return "You can't take the goblin!"; },
        talk:function() { Plot.createTextEvent(0, "The goblin challenges you to a duel."); return "The goblins says:<br>&nbsp;&nbsp;&nbsp;&nbsp;Keoijw kdfop qekdo kie."; },
        attack:function(i, p) {
                if (p == "sword") {
                        attack("goblin");
                        Player.score += 10;
                        Plot.createTextEvent(0, "Vanquished!");
                        return "The goblin has been slain!" ;
                } else if (p == "small_sword") {
                        Objects['small_sword'].drop();
                        return "The goblin has knocked the small sword from your hands.";
                } else if (p == null) {
                        return "You need a weapon!";
                } else {
                        Objects.Player.health = 0;
                        return "You can't kill a goblin with that!";
                }
        }
});

Plot.createConditionalText(function() { return Objects.Player.health <= 0; }, "\"Can it be that I have not lived as one ought?\" suddenly came into his head. \"But how not so, when I've done everything as it should be done?\"");

Plot.createConditionalText(function() { return Objects.Player.moves == 5 && !Objects.Player.has('keycard'); }, "There should be a blue keycard nearby.");

Plot.createConditionalHandler(function() { return Objects.Player.has('blue_keycard'); }, function() { Player.score += 10; return "Excellent.  Now to find the chest it opens..."; });

Plot.createConditionalHandler(function() { return Objects.Player.has('sword'); }, function() { Player.score += 10; return "Now where is that goblin?"; });

