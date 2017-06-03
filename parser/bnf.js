var BNF = {
        "COMMAND": ["ACTION", "ANSWER", "SHORTCUT"],//, "ANSWER", "ACTION"],
        
        
        
        // COMMANDS
        "ANSWER": ["OBJECT", "ADJECTIVES"],
        "SHORTCUT": ["INSPECT_ROOM", "LIST_INVENTORY", "DIRECTION", "WAIT"],
        "ACTION": [     "ACTION_MOVE",
                        "ACTION_INSPECT",
                        "ACTION_LOOK_UNDER",
                        "ACTION_LOOK_INSIDE",
                        "ACTION_TURN_ON",
                        "ACTION_TURN_OFF",
                        "ACTION_GET",
                        "ACTION_DROP",
                        "ACTION_WEAR",
                        "ACTION_PUT",
                        "ACTION_GIVE",
                        "ACTION_OPEN",
                        "ACTION_CLOSE",
                        "ACTION_UNLOCK",
                        "ACTION_LOCK",
                        "ACTION_READ",
                        "ACTION_TAKE_OFF",
                        "ACTION_FOLLOW",
                        "ACTION_WAIT",
                        "ACTION_ENTER",
                        "ACTION_EXIT",
                        "ACTION_TALK",
                        "ACTION_ATTACK"         ],
        
                        
                        
        // SHORTCUTS
        "INSPECT_ROOM": ["look around", "examine", "look", "inspect", "l"],
        "LIST_INVENTORY": ["inventory", "i"],
        "DIRECTION": ["starboard", "sb", "port", "aft", "fore", "northeast", "southeast", "southwest", "northwest", "north", "south", "east", "west", "down", "up", "in", "out", "enter", "exit", "ne", "se", "sw", "nw", "n", "s", "e", "w"], 
        "WAIT": ["wait", "z"],
        
      
        
        // ACTIONS
        "ACTION_MOVE": [        "TARGET_OBJECT , VERB_MOVE to the DIRECTION",
                                "TARGET_OBJECT , VERB_MOVE to DIRECTION",
                                "TARGET_OBJECT , VERB_MOVE DIRECTION",
                                "VERB_MOVE to the DIRECTION",
                                "VERB_MOVE to DIRECTION",
                                "VERB_MOVE DIRECTION"                                           ],
        "ACTION_INSPECT": [     "TARGET_OBJECT , VERB_INSPECT OBJECT_LIST",
                                "VERB_INSPECT OBJECT_LIST"                                      ],
        "ACTION_LOOK_UNDER": [  "TARGET_OBJECT , VERB_LOOK_UNDER OBJECT_LIST",
                                "VERB_LOOK_UNDER OBJECT_LIST"                                   ],
        "ACTION_LOOK_INSIDE": [ "TARGET_OBJECT , VERB_LOOK_INSIDE OBJECT_LIST",
                                "VERB_LOOK_INSIDE OBJECT_LIST"                                  ],
        "ACTION_GET": [         "TARGET_OBJECT , VERB_GET OBJECT_LIST",
                                "VERB_GET OBJECT_LIST"                                          ],
        "ACTION_TURN_ON": [     "TARGET_OBJECT , VERB_TURN_ON OBJECT_LIST",
                                "TARGET_OBJECT , turn OBJECT_LIST on",
                                "VERB_TURN_ON OBJECT_LIST",
                                "turn OBJECT_LIST on"                                           ],
        "ACTION_TURN_OFF": [    "TARGET_OBJECT , VERB_TURN_OFF OBJECT_LIST",
                                "TARGET_OBJECT , turn OBJECT_LIST off",
                                "VERB_TURN_OFF OBJECT_LIST",
                                "turn OBJECT_LIST off"                                          ],
        "ACTION_DROP": [        "TARGET_OBJECT , VERB_DROP OBJECT_LIST",
                                "VERB_DROP OBJECT_LIST"                                         ],
        "ACTION_PUT": [         "TARGET_OBJECT , VERB_PUT OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "TARGET_OBJECT , VERB_PUT OBJECT_LIST",
                                "VERB_PUT OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "VERB_PUT OBJECT_LIST"                                          ],
        "ACTION_GIVE": [        "TARGET_OBJECT , VERB_GIVE OBJECT_LIST to INDIRECT_OBJECT",
                                "TARGET_OBJECT , VERB_GIVE INDIRECT_OBJECT OBJECT_LIST",
                                "TARGET_OBJECT , VERB_GIVE OBJECT_LIST",
                                "VERB_GIVE OBJECT_LIST to INDIRECT_OBJECT",
                                "VERB_GIVE INDIRECT_OBJECT OBJECT_LIST",
                                "VERB_GIVE OBJECT_LIST"                                         ],
        "ACTION_OPEN": [        "TARGET_OBJECT , VERB_OPEN OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "TARGET_OBJECT , VERB_OPEN OBJECT_LIST",
                                "VERB_OPEN OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "VERB_OPEN OBJECT_LIST"                                         ],
        "ACTION_CLOSE": [       "TARGET_OBJECT, VERB_CLOSE OBJECT_LIST",
                                "VERB_CLOSE OBJECT_LIST"                                        ],
        "ACTION_UNLOCK": [      "TARGET_OBJECT , VERB_UNLOCK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "TARGET_OBJECT , VERB_UNLOCK OBJECT_LIST",
                                "VERB_UNLOCK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "VERB_UNLOCK OBJECT_LIST"                                       ],
        "ACTION_LOCK": [        "TARGET_OBJECT , VERB_LOCK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "TARGET_OBJECT , VERB_LOCK OBJECT_LIST",
                                "VERB_LOCK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "VERB_LOCK OBJECT_LIST"                                         ],
        "ACTION_READ": [        "TARGET_OBJECT , VERB_READ OBJECT_LIST",
                                "VERB_READ OBJECT_LIST"                                         ],
        "ACTION_WEAR": [        "TARGET_OBJECT , VERB_WEAR OBJECT_LIST",
                                "VERB_WEAR OBJECT_LIST",
                                "put OBJECT_LIST on"                                            ],
        "ACTION_TAKE_OFF": [    "TARGET_OBJECT , VERB_TAKE_OFF OBJECT_LIST",
                                "VERB_TAKE_OFF OBJECT_LIST"                                     ],
        "ACTION_ENTER": [       "TARGET_OBJECT , VERB_ENTER OBJECT_LIST",
                                "VERB_ENTER OBJECT_LIST"                                        ],
        "ACTION_EXIT": [        "TARGET_OBJECT , VERB_EXIT OBJECT_LIST",
                                "VERB_EXIT OBJECT_LIST"                                         ],
        "ACTION_TALK": [        "TARGET_OBJECT , VERB_TALK OBJECT_LIST",
                                "VERB_TALK OBJECT_LIST"                                         ],
        "ACTION_ATTACK": [      "TARGET_OBJECT , VERB_ATTACK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "TARGET_OBJECT , VERB_ATTACK OBJECT_LIST",
                                "VERB_ATTACK OBJECT_LIST PREPOSITIONAL_PHRASE",
                                "VERB_ATTACK OBJECT_LIST"                                       ],
        "ACTION_FOLLOW": [      "TARGET_OBJECT , follow me",
                                "follow me"                                                     ],
        "ACTION_WAIT": [        "TARGET_OBJECT , wait here",
                                "wait here"                                                     ],
        
        
        
        
        
        // VERBS
        "VERB_MOVE": ["walk", "move", "head", "go"], 
        "VERB_INSPECT": ["look_at", "look", "inspect", "examine", "l", "i"], 
        "VERB_LOOK_UNDER": ["look_under", "look_beneath", "look_below"], 
        "VERB_LOOK_INSIDE": ["look_inside", "look_in", "look_into"], 
        "VERB_TURN_ON": ["light", "turn_on", "activate"], 
        "VERB_TURN_OFF": ["extinguish", "turn_off", "deactivate"], 
        "VERB_GET": ["get", "pick_up", "pick", "take"], 
        "VERB_DROP": ["drop", "put_down", "set_down"], 
        "VERB_PUT": ["put", "set"], 
        "VERB_GIVE": ["give"], 
        "VERB_OPEN": ["open"], 
        "VERB_CLOSE": ["close"], 
        "VERB_UNLOCK": ["unlock"], 
        "VERB_LOCK": ["lock"], 
        "VERB_READ": ["read"], 
        "VERB_WEAR": ["wear", "put on"], 
        "VERB_TAKE_OFF": ["take off", "remove"], 
        "VERB_ENTER": ["enter"], 
        "VERB_EXIT": ["exit", "leave"], 
        "VERB_TALK": ["talk to", "converse with", "talk", "converse"], 
        "VERB_ATTACK": ["hit", "attack", "kill"], 
        
        
        
        
        
        
        // PHRASES, OBJECTS, ETC.
        "PREPOSITIONAL_PHRASE": ["PREPOSITION PREPOSITION_OBJECT"],
        
        
//                                "VERB_INSPECT ALL INCLUDE_OBJECTS FROM OBJECT12 EXCEPT EXCLUDE_OBJECTS",                // testing order
//                                "VERB_INSPECT INCLUDE_OBJECTS FROM OBJECT12 EXCEPT EXCLUDE_OBJECTS",
        "OBJECT_LIST": [        "ALL INCLUDE_OBJECTS EXCEPT EXCLUDE_OBJECTS FROM OBJECT12",
                                "ALL INCLUDE_OBJECTS EXCEPT EXCLUDE_OBJECTS",
                                "INCLUDE_OBJECTS EXCEPT EXCLUDE_OBJECTS FROM OBJECT12",
                                "INCLUDE_OBJECTS EXCEPT EXCLUDE_OBJECTS",
                                "ALL INCLUDE_OBJECTS FROM OBJECT12",
                                "ALL INCLUDE_OBJECTS",
                                "INCLUDE_OBJECTS FROM OBJECT12",
                                "INCLUDE_OBJECTS"                                               ],
        
        "INCLUDE_OBJECTS": [    "OBJECT0 AND OBJECT1 AND OBJECT2 AND OBJECT3 AND OBJECT4 AND OBJECT5",
                                "OBJECT0 AND OBJECT1 AND OBJECT2 AND OBJECT3 AND OBJECT4",
                                "OBJECT0 AND OBJECT1 AND OBJECT2 AND OBJECT3",
                                "OBJECT0 AND OBJECT1 AND OBJECT2",
                                "OBJECT0 AND OBJECT1",
                                "OBJECT0"                                                       ],
                        
        "EXCLUDE_OBJECTS": [    "OBJECT6 AND OBJECT7 AND OBJECT8 AND OBJECT9 AND OBJECT10 AND OBJECT11",
                                "OBJECT6 AND OBJECT7 AND OBJECT8 AND OBJECT9 AND OBJECT10",
                                "OBJECT6 AND OBJECT7 AND OBJECT8 AND OBJECT9",
                                "OBJECT6 AND OBJECT7 AND OBJECT8",
                                "OBJECT6 AND OBJECT7",
                                "OBJECT6"                                                       ],
                                
        "TARGET_OBJECT": ["OBJ"],       // for targets.. e.g. ashton, get the sword
        
        "OBJECT":  ["OBJ"],             // for responses to questions
        
        "OBJECT0": ["OBJ"],             // include objects
        "OBJECT1": ["OBJ"],
        "OBJECT2": ["OBJ"],
        "OBJECT3": ["OBJ"],
        "OBJECT4": ["OBJ"],
        "OBJECT5": ["OBJ"],
        
        "OBJECT6": ["OBJ"],             // exclude objects
        "OBJECT7": ["OBJ"],
        "OBJECT8": ["OBJ"],
        "OBJECT9": ["OBJ"],
        "OBJECT10": ["OBJ"],
        "OBJECT11": ["OBJ"],
        
        "OBJECT12": ["OBJ"],            // from object
        
        "INDIRECT_OBJECT": ["OBJ"],     // for actions with an indirect object
        
        "PREPOSITION_OBJECT": ["OBJ"],  // for actions with a preposition object

        
        
        
        
        "OBJ": [                "ARTICLE ADJECTIVES NOUN",
                                "ARTICLE ADJECTIVE ADJECTIVE NOUN",
                                "ARTICLE ADJECTIVE NOUN",
                                "ARTICLE NOUN that is ADJECTIVES",              // testing
                                "ARTICLE NOUN",

                                "ADJECTIVES NOUN",
                                "ADJECTIVE ADJECTIVE NOUN",
                                "ADJECTIVE NOUN",

                                "NOUN that is ADJECTIVES",                      // testing
                                "NOUN"                                                          ],
                                
        "ADJECTIVES": [         "ADJECTIVE AND ADJECTIVES",                     // testing
                                "ADJECTIVE ADJECTIVES",
                                "ADJECTIVE"                                                     ],
        
        
        "PREPOSITION": ["with", "using", "in", "into", "to", "for"],
        
        "FROM": ["from"],//,"in"],
                                
        "AND": [",_and", "and", ","],
        "EXCEPT": ["except_for", "except", "but_for", "but"],
        
        "ARTICLE": ["a", "an", "the"],
        "ADJECTIVE": [],                                                        // populated by methods to create objects and characters
        "NOUN": [],                                                             // populated by methods to create objects and characters
        
        "ALL": ["all","every"]
};
