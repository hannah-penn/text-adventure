var textElement = document.getElementById("text");
var optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {
    hitPoints: 20,
  };
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;

  var buttonsToRemove = [];
  for (let i = 0; i < optionButtonsElement.childElementCount; i++) {
    var childInQuestion = optionButtonsElement.children[i];
    if (childInQuestion.tagName === "BUTTON") {
      buttonsToRemove.push(childInQuestion);
    }
  }

  for (let i = 0; i < buttonsToRemove.length; i++) {
    optionButtonsElement.removeChild(buttonsToRemove[i]);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "It's a beautiful day in Tiparos, a city in the northwest of the continent of Malrad-Jint, and you are a very naive dwarf. Three years ago, much of the city was destroyed when an evil warlock attacked with fire raining from the sky. Many citizens died. During the recovery, a religious faction called the Order of Lucene gained power, using the survivors' grief and fear of magic to their advantage. Today, all forms of magic are banned in this city, under punishment of imprisonment or exile. This vigilance even extends to casting suspicion on innately magical races, like elves. But what the Order doesn't know won't hurt them...right?",
    options: [
      {
        text: "Right on! Stick it to the man!",
        nextText: 2,
        setState: { gotSpores: true },
      },
      {
        text: "Hmm...don't want to get in trouble. It's probably banned for good reason.",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text: "Great! Time for an adventure. It rained last night - perfect for magical mushroom-picking - and you have a couple of spots in mind. You just have to be back before your evening shift cleaning the manor of one of the prominent Order members.",
    options: [
      {
        text: "Pick up your satchel from the table and make sure everything is carefully stowed in its correct place.",
        nextText: 4,
      },
      {
        text: "No time! Just grab the satchel and go - there's mushrooms to pick!",
        nextText: 5,
        setState: { noBottles: true },
      },
    ],
  },
  {
    id: 3,
    text: "Are you sure? Might be fun!",
    options: [
      {
        text: "Oh, go on then. You don't have anything better to do.",
        nextText: 2,
      },
    ],
  },
  {
    id: 4,
    text: "Lucky you did check your bag - your specimen bottles weren't packed! You grab them from the shelf, tuck them into their special case and buckle up your satchel.",
    options: [
      {
        text: "Let's go!",
        nextText: 5,
        setState: { gotBottles: true },
      },
    ],
  },
  {
    id: 5,
    text: "Stopping for a moment to collect the lunch you prepared for yourself this morning, you head out of the the Rose & Respite - the pub owned by your older twin siblings, Moggy and Mortar. Which way now?",
    options: [
      {
        text: "Let's go the quickest route - to the west.",
        nextText: 6,
      },
      {
        text: "You really don't want to bump into anyone, so let's go south and avoid the market.",
        nextText: 7,
      },
      {
        text: "The apothecary is to the north, and you need some supplies.",
        nextText: 8,
      },
    ],
  },
  {
    id: 6,
    text: "Walking purposefully along the sunny streets of Tiparos, you seem to be hurrying in the opposite direction to everyone else. What's going on?",
    options: [
      {
        text: "No time to investigate. You need to get out to the countryside as soon as possible.",
        nextText: 9,
      },
      {
        text: "You should ask someone where all these people are going. You don't want to miss out on anything exciting!",
        nextText: 10,
      },
    ],
  },
  {
    id: 7,
    text: "You zip along the winding streets in a wide curve around the busy marketplace, keeping your head down (which isn't much of a challenge for dwarves). Unfortunately, you aren't looking where you're going and bump into your older brother, Mortar. He doesn't look happy to see you here.",
    options: [
      {
        text: "Think fast! 'Mortar! I'm so glad I found you, I was lost!'",
        nextText: 13,
      },
      {
        text: "Don't say anything - just run!",
        nextText: 12,
      },
    ],
  },
  {
    id: 8,
    text: "You arrive at Odds and Bods just as Philustra (a suspiciously tall human who always wears large, furry earmuffs, no matter the weather) is setting the 'open' sign outside the shop doorway. 'Ah, Miracle! Good to see you - what are you after today?",
    options: [
      {
        text: "'A pair of owlbear leather gloves please - these ones are worn through!'",
        nextText: 14,
        setState: { gotGloves: true },
      },
      {
        text: "'Some purple ink and three new quills please. I need to make some sketches today.'",
        nextText: 15,
        setState: { gotStationery: true },
      },
      {
        text: "'I lost my knife - yes, again - so I'd like one of those silver daggers you showed me last time.'",
        nextText: 16,
        setState: { gotKnife: true },
      },
    ],
  },
  {
    id: 9,
    text: "You dip and dodge among the crowds of people, walking purposefully and ignoring the few who try to catch your attention. ",
    options: [
      {
        text: "Quick - don't get distracted!",
        nextText: 18,
      },
    ],
  },
  {
    id: 10,
    text: "You tap a friendly-looking human on the lower back and ask them where everyone is rushing off to. 'The Order's giving an assembly today! You are coming, aren't you?' they reply, squinting down at you suspiciously. ",
    options: [
      {
        text: "Oh damn, you'd totally forgotten! It wouldn't look good to skip a speech from the rulers of the city. 'Er, yes?'",
        nextText: 11,
      },
      {
        text: "'No thanks - got some mushrooms to pick. See ya!'",
        nextText: 12,
        setState: { skippedAssembly: true },
      },
    ],
  },
  {
    id: 11,
    text: "'Great!' the human says, clapping a hand on your shoulder with a grip slightly too tight to be comfortable. 'I'll accompany you there. This way.'",
    options: [
      {
        text: "It doesn't seem like this human is going to let you go anywhere. Best to go quietly and give up on mushroom-picking for today.",
        nextText: 999,
      },
    ],
  },
  {
    id: 12,
    text: "'Hey, wait! STOP!' The shouts echo through the streets as you run as fast as your little legs can carry you. You just know that people are looking at you hurry away, and that this will definitely come back to bite you. Damn it.",
    options: [
      {
        text: "Oh well, that's a problem for future you. Nothing you can do about it now, so you make your way to the western gates.",
        setState: { inTrouble: true },
        nextText: 18,
      },
      {
        text: "You should double back to the Rose and Respite. If Moggy finds out about this she'll keep you scrubbing the cellar until mushroom season is over.",
        nextText: 999,
      },
    ],
  },
  {
    id: 13,
    text: "Mortar and Moggy are almost exactly identical, both in looks and in mannerisms, especially when they're cross with you. 'Don't give me that nonsense, young lady. Where are you going, exactly?' Mortar says angrily, his long beard wagging with his words.",
    options: [
      {
        text: "'To pick mushrooms, obviously. What are you gonna do about it?' You are so sick of being patronised!",
        nextText: 19,
      },
      {
        text: "'I told you, I was lost! I was trying to get to the plaza!' Mortar would never skip an assembly. If you stall him, he's sure to leave soon, and you really don't want to argue today.",
        nextText: 20,
      },
    ],
  },
  {
    id: 14,
    text: "'Here you are, one pair of gloves, size 'D'. Shall I put this on your tab?' Philustra says, handing you a pair of gleaming, soft-looking leather gloves with brass buckles.",
    options: [
      {
        text: "'Yes please! I promise I'll pay, um, soon!' you bluster, shoving the gloves in your bag. 'Bye!'",
        nextText: 18,
      },
    ],
  },
  {
    id: 15,
    text: "'Purple ink...and...three quills. Is there anything else?'",
    options: [
      {
        text: "'Yes, can I have the gloves too please?'",
        setState: { gotGloves: true },
        nextText: 14,
      },
      {
        text: "'I think I should really have a new knife...'",
        setState: { gotKnife: true },
        nextText: 16,
      },
      {
        text: "As you stow the stationery carefully in your bag, you notice your specimen bottles aren't in there. You must have left them in your room - lucky you noticed! 'Three small glass vials please!'",
        requiredState: (currentState) => currentState.noBottles,
        setState: { gotBottles: true },
        nextText: 17,
      },
    ],
  },
  {
    id: 16,
    text: "Philustra packages up the little knife for you and hands it over, saying in a low voice that only you can hear, 'I could really do with some smokecaps. Bring me some back and I won't tell Moggy about this. Deal?'",
    options: [
      {
        text: "Smokecaps?! They're a pain in the arse to find, and definitely not legal, but it's probably best to keep Philustra on your side. 'Deal.'",
        setState: { madeDeal: true },
        nextText: 18,
      },
      {
        text: "'Um...maybe next time. Sorry.' You don't meet Philustra's eyes as you shove the box in your bag, but you feel her watching you as you walk away.",
        nextText: 18,
        setState: { snitchedOn: true },
      },
    ],
  },
  {
    id: 17,
    text: "The bottles clink together as you take them from Philustra and slot them carefully inside your satchel. 'Thanks, Phil!' you smile as you start to trot away. Philustra blurts, 'Wait one moment! You need to pay for those!'",
    options: [
      {
        text: "'Send the bill to the Rose & Respite, I'll take care of it!' you shout back, and continue towards the city gates.",
        nextText: 18,
      },
    ],
  },
  {
    id: 18,
    text: "With all that taken care of, you finally manage to get to the gates to the west of the city. Luckily for you, there's only one guard on duty this morning - you suppose they weren't expecting anyone to leave Tiparos while the Order's giving an assembly. He hasn't noticed you yet, and from this angle he'd have to lean forwards to actually see your face anyway.",
    options: [
      {
        text: "Walk straight past the guard, bold as brass.",
        nextText: 27,
      },
      {
        text: "Hmm, you need to distract him somehow. Look through your bag for ideas.",
        nextText: 28,
      },
      {
        text: "You've never been the stealthy type, but maybe you can sneak through while he's looking the other way.",
        nextText: 45,
      },
    ],
  },
  {
    id: 19,
    text: "'Miracle, this isn't a joke. You can't just skip Order meetings whenever you feel like it. Tiparos is the domain of Lucene, and Alaster is leading us into the light.' He looks both angry and worried.",
    options: [
      {
        text: "Mortar has become steadily more fervent in his devotion to Lucene of late, and you don't want to provoke him.",
        nextText: 21,
      },
      {
        text: "He always makes a mountain out of a molehill. You've got more important things to do, so you'll make it up to him later.",
        nextText: 22,
      },
    ],
  },
  {
    id: 20,
    text: "'I knew you were bad at directions, but wow, Miracle. You should really know the way to the plaza from the Rose & Respite by now, you're nearly 30.'",
    options: [
      {
        text: "'Yeah, I know,' you say, pretending to be sheepish. 'I'm rubbish at finding my way around. I've just got to drop off my bag at home and then I'll be straight there, okay?'",
        nextText: 23,
      },
    ],
  },
  {
    id: 21,
    text: "You sigh deeply.'Mort, I know magic is banned, but I swear I'll be careful. I've never been caught before.' He gasps and looks around before hissing, 'What do you mean? Have you been doing magic?!' Whoops.",
    options: [
      {
        text: "'Er, no, I meant I haven't been caught leaving Tiparos before! I'm not doing magic!'",
        nextText: 23,
      },
      {
        text: "Well, he was going to find out sooner or later. 'Okay, fine, I've been experimenting, but nobody except Moggy knows!'",
        nextText: 24,
      },
    ],
  },
  {
    id: 22,
    text: "'Mortar, I have better things to do than stand around and get lectured at by some religious nut with ideas above his station. I'm going now, I'll see you when I get back,' you say, the words coming out a lot sharper than you had intended.",
    options: [
      {
        text: "Your brother looks dumbstruck at your words - so much so that he doesn't seem to be able to stop you leaving - but you know you're going to be in for an earful when you get home.",
        nextText: 18,
        setState: { inTrouble: true },
      },
    ],
  },
  {
    id: 23,
    text: "Mortar looks at you as if deciding whether he can trust you, but then the tolling of a bell catches his attention. 'Yes, alright - remember, it's back down this street, then left at the Triple Cherry, then the second right, then left, right, right, left again, then up the stairs, around the library and straight ahead.' He hurries off without a backwards glance.",
    options: [
      {
        text: "He's finally gone. You knew he wouldn't want to be late for the assembly.",
        nextText: 18,
      },
    ],
  },
  {
    id: 24,
    text: "'Miracle! Please tell me this isn't true. My own sister. A sinner against Lucene.' He suddenly has your upper arm in a vicelike grip. You've never seen him look like this before, and it's frightening.",
    options: [
      {
        text: "Attempt to wrench your arm out of his grip and escape.",
        nextText: 25,
      },
      {
        text: "Try to reason with him.",
        nextText: 26,
      },
    ],
  },
  {
    id: 25,
    text: "You twist suddenly to the side, breaking his grasp on you. He tries to grab you again, but you're too fast - you dodge his outstretched arm and run for your life. ",
    options: [
      {
        text: "His shouts echo through the street behind you, but you don't look back. You're in deep trouble when you get home.",
        nextText: 18,
        setState: { inTrouble: true },
      },
    ],
  },
  {
    id: 26,
    text: "'Morty, look, it's really not a big deal! I haven't done anything dangerous! Don't-' Your pleas are cut off by his hand over your mouth, and you start to panic as he shouts for a guard.",
    options: [
      {
        text: "You never thought your own brother would hand you over to the Order, but you clearly didn't know him as well as you thought you did. It turns out you really are a very naive dwarf.",
        nextText: 999,
      },
    ],
  },
  {
    id: 27,
    text: "You walk straight through the gates, trying to look as confident as you possibly can. You keep putting one small foot in front of the other, barely believing your own daring, until the guard looks up and says, 'Oi!'",
    options: [
      {
        text: "Time to test out your acting skills.",
        nextText: 29,
      },
      {
        text: "RUN!",
        nextText: 30,
      },
    ],
  },
  {
    id: 28,
    text: "Alright, what do you have here...maybe this would make a good distraction?",
    options: [
      {
        text: "Throw one of your vials behind the guard to get him to turn around, then slip past.",
        nextText: 36,
        requiredState: (currentState) => currentState.gotBottles,
      },
      {
        text: "Chuck your knife! Not at him, of course, just near enough to be alarming.",
        nextText: 37,
        requiredState: (currentState) => currentState.gotKnife,
      },
      {
        text: "You'd totally forgotten about this packet of spores you'd collected last month! This'll do nicely. They probably won't even kill him.",
        nextText: 38,
        setState: { gotSpores: false },
      },
    ],
  },
  {
    id: 29,
    text: "'Yes?' you drawl, as imperiously as you can, in your best High City accent. The guard looks taken aback at your manner. 'Care to explain why exactly you are delaying me?' He seems confused and says, 'Er, no harm meant, miss, only that nobody is meant to be leaving Tiparos at present, on account of the, er, assembly and all.'",
    options: [
      {
        text: "'I have special dispensation from Jophiel for this excursion. In fact, I saw him just this morning. Now, no more questions or you shall be answering to your superiors.'",
        nextText: 31,
      },
      {
        text: "Just look at him haughtily and hope he takes the hint.",
        nextText: 32,
      },
      {
        text: "'Don't you know who I am?! I am Mistress Prudence-is-to-Worship-and-be-Humbled-Before-Him!' For a made-up name, you're pretty proud of yourself.",
        nextText: 33,
      },
    ],
  },
  {
    id: 30,
    text: "You haven't done this much running in quite some time, but dwarves are built for endurance, and you break into a determined trot as the guard shouts, 'Stop! STOP, in the name of Lucene!'",
    options: [
      {
        text: "Keep going! Nobody's going to ruin your day - you'll worry about getting back into the city later.",
        nextText: 48,
        setState: { recognisedAtGate: true },
      },
    ],
  },
  {
    id: 31,
    text: "The guard's face changes, and you're finding his expression hard to read. 'Ah, my apologies, madam. If you wouldn't mind stepping this way to complete a checkout form, I'd be much obliged.'",
    options: [
      {
        text: "'Very well. I suppose we must all bow to bureaucracy after all.'",
        nextText: 34,
      },
    ],
  },
  {
    id: 32,
    text: "You stare at each other for a long time. An uncomfortably long time. So long that your eyes start watering. Neither one of you seems to be willing to break eye contact, but eventually the guard says, 'Well?'",
    options: [
      {
        text: "'I have special dispensation from Jophiel for this excursion. In fact, I saw him just this morning. Now, no more questions or you shall be answering to your superiors.'",
        nextText: 31,
      },
      {
        text: "'Don't you know who I am?! I am Mistress Prudence-is-to-Worship-and-be-Humbled-Before-Him! My business is none of your concern!'",
        nextText: 33,
      },
    ],
  },
  {
    id: 33,
    text: "'Mistress...Poodle-Warship-and-Bumblebee-Forehead?' he mumbles as he scratches his quill on his ledger, not meeting your eyes. He looks abashed, as he knows as well as you do that only the loftiest and most powerful members of the Order of Lucene choose such long sobriquets upon their baptism.",
    options: [
      {
        text: "'Prudence-is-to-Worship-and-be-Humbled-Before-Him!' you bristle. In for a penny, in for a pound...",
        nextText: 35,
        setState: { disguised: true },
      },
      {
        text: "Close enough. 'Correct! And I do not expect to be waylaid by plebians such as yourself while going about my holy business. If I were you, I would ensure that I was not on duty in say...four hours. Adieu, young man, adieu.'",
        nextText: 48,
        setState: { disguised: true },
      },
    ],
  },
  {
    id: 34,
    text: "You step over to the counter of the checkpoint building, and as you begin to sign the ledger with an indecipherable scribble, a large hand pins your wrist to the wood. 'I think you're a dirty, heathen liar,' the guard breathes in your face, a cloud of chewing-tobacco stench enveloping you. 'Everyone in the Order knows that Jophiel is on a mission to Lake Symmerian, and has been for some time.'",
    options: [
      {
        text: "Dung. 'You-you are sadly mistaken, sir!' Your terrified squeak only makes the guard's wicked grin broaden, and he calls a burly half-orc over to him. 'Look what we've got here, Graham. A little dwarven apostate. Take her in.'",
        nextText: 999,
      },
    ],
  },
  {
    id: 35,
    text: "You wait nervously while the guard laboriously scratches your name into his ledger. Eventually he seems satisfied and waves you on with a respectful, 'Good day, madam,' and a tip of his sky-blue side cap.",
    options: [
      {
        text: "Phew! You inwardly congratulate yourself on your genius and force your gait into a dignified saunter, nodding at him loftily.",
        nextText: 48,
        setState: { disguised: true },
      },
    ],
  },
  {
    id: 36,
    text: "Your height is certainly to your advantage here - you don't even need to duck out of sight as you quietly take a vial out of your satchel, take a moment to aim, and lob it at the far corner of the little stone building. There's a satisfying tinkle of glass, a 'Whuh?' and you zip past the desk and down the road leading out of Tiparos as fast as your little legs can carry you. Easy!",
    options: [
      {
        text: "Go, go, go! It's already mid-morning, no time to waste!",
        nextText: 48,
      },
    ],
  },
  {
    id: 37,
    text: "Oh-so-carefully, oh-so-quietly, you take the box out of your bag and lift off the lid. There it sits, nestled in the carved wooden inlay, blade reflecting the blue of the sky, looking like a sure-fire way to ruin someone's morning.",
    options: [
      {
        text: "Stop admiring the bloody thing and fling it!",
        nextText: 39,
        setState: { gotKnife: false },
      },
      {
        text: "This was pretty expensive...and you might need it later. You'll just walk past instead.",
        nextText: 27,
      },
    ],
  },
  {
    id: 38,
    text: "The packet of carefully-folded paper rustles in your hand as you open it. The yellowish powder of spores inside glitters and you realise that you don't recall exactly which mushroom species this came from.",
    options: [
      {
        text: "It's probably the big one that looks like an inside-out sunflower. That variety has just finished spreading its spores for the year, so it makes sense that you would have collected some recently.",
        nextText: 40,
      },
      {
        text: "You picked some Cheese Trumpets for dinner last time you were out, so it's got to be from those. You definitely remember thinking about how to grow them in the cellar.",
        nextText: 41,
      },
    ],
  },
  {
    id: 39,
    text: "With not a little regret, you pick up the knife by the beautifully carved handle and lob it unevenly over the desk. It clangs off something on the desk, there's a gushing sound, the guard swears, and you hear a thump highly suggestive of a human head connecting with a wooden surface. Time to skedaddle!",
    options: [
      {
        text: "Run and don't look back!",
        nextText: 48,
        setState: { recognisedAtGate: true },
      },
    ],
  },
  {
    id: 40,
    text: "You untwist the paper so that it lies flat on your palm with a neat pile of twinkling spores in the centre. You recall the name of the fungus these came from - Needlepoint Amato. Standing on your tiptoes, you take a deep breath and blow the spores towards the unsuspecting guard.",
    options: [
      {
        text: "Blow gently.",
        nextText: 42,
      },
      {
        text: "Blow hard.",
        nextText: 43,
      },
    ],
  },
  {
    id: 41,
    text: "'Cheese Trumpets are so named owing to both the unmistakable reek of blue cheese which comes from their guttation, and the honking noise the mature fungi make on being squeezed. Enthusiasts note the curious marbling on the stem during spore release. They are also delicious fried with leeks.' - Moonshadow's Observations, p24 ",
    options: [
      {
        text: "Great, whatever - now blow the spores towards the guard.",
        nextText: 44,
      },
    ],
  },
  {
    id: 42,
    text: "With great care, you slowly exhale just enough air for the spores to float over to the guard, who is sitting behind his desk apparently occupied with that day's edition of The Word. The glittering spores twinkle in the sunlight and you see them drawn towards him as he takes a deeper breath.",
    options: [
      {
        text: "No need to watch what happens next - you've seen what Needlepoint Amato can do.",
        nextText: 48,
        setState: { recognisedAtGate: true },
      },
    ],
  },
  {
    id: 43,
    text: "You take a deep breath and puff it out on the pile of spores, intending to send a large cloud of them at the unsuspecting guard. Unfortunately, you miscalculate the angle and most of them are blown right back into your face. The involuntary gasp of surprise means that your mouth, nose, throat and lungs are instantly aflame with what feels like red-hot needles.",
    options: [
      {
        text: "Your coughing, sneezing and desperate croaks for help draw the guard's attention and he hurries over to you. Your eyes start to swell shut, and only now do you recall the passage from 'Moonshadow's Oberservations' stating that the spores of Needlepoint Amato are, indeed, fatal when inhaled in large quantities.",
        nextText: 999,
      },
    ],
  },
  {
    id: 44,
    text: "The cloud of spores hangs in the air for a moment, twinkling ominously before riding your exhale towards the unsuspecting guard. After a few moments, he lets out a tiny burp, almost immediately followed by one of the loudest, longest belches you've ever heard in your life. He'll be at it for a while, so now's the perfect time to scarper.",
    options: [
      {
        text: "Phew - glad you got the right mushroom species! That could have ended quite badly.",
        nextText: 48,
      },
    ],
  },
  {
    id: 45,
    text: "Alright - time to be sneaky. You take some deep, grounding breaths and try to remember the tips in 'Twisted Dick's Handbook for Curs', a dog-eared copy of which was left behind in the Rose & Respite following a particularly nasty barfight the previous winter. Moggy had been too busy frogmarching the scoundrels out of her pub to notice you slip it down the back of your tunic. Now, what was step one?",
    options: [
      {
        text: "Take off your heeled boots so that the leather doesn't squeak and give you away.",
        nextText: 46,
      },
      {
        text: "Hitch up the hem of your floor-length robe - you don't want it rustling on the ground.",
        nextText: 47,
      },
    ],
  },
  {
    id: 46,
    text: "You quickly take your boots off, knotting the laces together and slinging them over your shoulder. Unfortunately, you take no more than two steps before your robe tangles around your feet and sends you sprawling on the flagstones in a most undignified manner. You should have remembered that your robe is too long to walk in without the extra couple of inches from your heeled boots!",
    options: [
      {
        text: "The guard takes his time in getting to his feet and coming around to the other side of the desk to watch you trying to extricate yourself. No way you can leave Tiparos now.",
        nextText: 999,
      },
    ],
  },
  {
    id: 47,
    text: "Holding the hem of your robe up around your knees, you take a tentative, tiptoeing step forwards, then glance quickly up at the guard. He's still nose-deep in the newspaper, so you bring your other foot forwards - and so on in that manner, until you're well past the checkpoint booth and let the robe drop to the floor again.",
    options: [
      {
        text: "Right - no more delay! The mushrooms are waiting.",
        nextText: 48,
      },
    ],
  },
  {
    id: 48,
    text: "Goodness, who would have thought that simply leaving the city you were born in could be such a palaver? You suppose that it does give the day a sense of adventure, but you'd rather just be able to go out and pick mushrooms whenever you want. Ah well.",
    options: [
      {
        text: "Walk down the dirt road leading out of Tiparos. You've got a couple of different spots you could forage for mushrooms.",
        nextText: 49,
      },
    ],
  },
  {
    id: 49,
    text: "Now, where to go next? It's a bright, sunny day with a crisp breeze winding through the trees. The world is your oyster mushroom.",
    options: [
      {
        text: "The ruined temple is always a good spot for shrooms - it's damp, cold and quiet as the grave. Very peaceful.",
        nextText: 50,
      },
      {
        text: "Something about the forest appeals to you today. The smell of pine, the crunch of bracken underfoot, the dappled light...",
        nextText: 51,
      },
    ],
  },
  {
    id: 50,
    text: "Off in the west, you see the broken stone blocks marking the spot where the temple of Silvanus used to stand. You remember visiting on feast-days as a child, with Moggy and Miracle dressed in matching emerald robes, and your parents crowned with garlands of oak leaves.",
    options: [
      {
        text: "Brush away the tear that comes to your eye. You've spent enough time mourning your parents, and life will never go back to how it was before Lytheran's attack on the city.",
        nextText: 52,
      },
    ],
  },
  {
    id: 51,
    text: "To the northwest, a patch of trees many times taller than the Rose & Respite looms - you can't see its true size from here, but you've got lost in those woods more than once. You're certain you know your way to the particular clearing you want to visit today, however.",
    options: [
      {
        text: "You begin the walk to the edge of the forest. It should only take an hour or so.",
        nextText: 51.5,
      },
    ],
  },
  {
    id: 51.5,
    text: "Lost in thought, you trudge towards the forest. You're so deep in a mental recital of Gregorius Gartho's 'Twelve Toxic Toadstools' that you don't notice the creature stalking you until it's too late; there's an explosion of movement from the thicket to your right, and you don't even have time to scream before the beast is upon you, tearing at your flesh with its sharp beak.",
    options: [
      {
        text: "Unfortunate for you, yes, but everything has to eat. Especially owlbears.",
        nextText: 999,
      },
    ],
  },
  {
    id: 52,
    text: "Arriving at the ruins, you rest for a moment on one of the smaller stone blocks. The sun is directly overhead now, and although it's not a hot day, you'll be glad of the shade in the underground portion of the temple. It truly is a shame that the Order destroyed this place - it used to be beautiful.",
    options: [
      {
        text: "Rest a bit longer. You're not in a hurry, and the intricate carvings on the blocks are still mostly intact. You remember making up stories about the animals etched on the stone during the boring bits of ceremonies.",
        nextText: 53,
      },
      {
        text: "You came here for mushrooms, and the sooner you collect them the sooner you can study them at home. Head down into the temple.",
        nextText: 83,
      },
    ],
  },
  {
    id: 53,
    text: "The sun warms you as you admire the skill that seems to have imbued the engravings with life - despite the stone they're carved into. You may be a druid, but you're still a dwarf, and you have a lot of respect for good stonework. You're so engrossed that you don't notice the dryad behind you until the leaves that make up her branched horns cast a shadow on the carved stone.",
    options: [
      {
        text: "Stay very still and wait for her to make the next move. Dryads are skittish and you don't want her to see you as a threat.",
        nextText: 54,
      },
      {
        text: "Slowly and carefully get to your feet. You want to reassure her that you mean no harm.",
        nextText: 55,
      },
      {
        text: "You've seen the dryads who live in this area before, even if you've never spoken to them. Turn around and greet her with a friendly smile.",
        nextText: 56,
      },
    ],
  },
  {
    id: 54,
    text: "Despite the warmth of the sun, you feel frozen as you wait for the dryad to do something. You hear some faint rustling and creaking, and you can see from the shadows that she is swaying side-to-side as she inspects you.",
    options: [
      {
        text: "She doesn't seem scared, but you don't want to spook her. Stay still, but extend your trust and say, 'Hail and well met. My name is Miracle.'",
        nextText: 55,
      },
      {
        text: "Stay silent. You don't know what she wants, and it's safest to do nothing until you know whether you're in danger.",
        nextText: 59,
      },
    ],
  },
  {
    id: 55,
    text: "The hissing, croaking voice of the dryad spits, 'Silent! You are here, why? Our sacred place!' Lucky you brushed up on your Sylvan recently, otherwise you wouldn't have a hope of understanding her.",
    options: [
      {
        text: "'I am only here to admire the temple and say a prayer to Sylvanus,' you lie. You know how territorial dryads can be, and you don't want to provoke her.",
        nextText: 57,
      },
      {
        text: "You have a feeling you should tell the truth, so you say, 'My interest is only in the mushrooms that grow in the temple. I am here to pick some, then I will leave.'",
        nextText: 58,
      },
    ],
  },
  {
    id: 56,
    text: "You get up and turn around, smiling broadly and stretching your arm towards the dryad - who is much taller than you had estimated. Worse, she's a yew dryad, covered in large, poison-tipped barbs. You look up, and up, and up, into the knotted twigs that resemble a face.",
    options: [
      {
        text: "The dryad sees your bared teeth, contorted face and outthrust hand, and quick as a wink she stabs you with one long finger, tipped with a dagger-sharp needle. It wouldn't even have been fatal, you reflect as the world fades around you, had she not been a yew dryad. Just your luck.",
        nextText: 999,
      },
    ],
  },
  {
    id: 57,
    text: "The dryad slowly shakes her head, the branches that make up her antlers rippling. 'Lie,' she creaks. 'Three summers. Folk came, temple died.' You assume she's talking about the Order destroying the temple when they took over Tiparos, as part of their attempt to purge the city and its people of magic. 'Now, no folk. No sing, no dance, no Sylvanus.'",
    options: [
      {
        text: "You feel suddenly sad for the terrifying half-tree spirit. She must have been watching when the Order destroyed the home of her patron, but you would never have guessed that she enjoyed people being here.",
        nextText: 67,
      },
    ],
  },
  {
    id: 58,
    text: "'Hmm,' the dryad rumbles, and she takes a deep sniff. 'No lie,' Could she possibly know whether or not you're lying from your...smell? 'Dwarf. Go. Take mushrooms. Go.' As you scrabble towards the entrance to the temple's lower levels, the dryad intones the sacred oath of Sylvanus, imploring you only to take what you need, in respect of his gifts.",
    options: [
      {
        text: "You feel a great surge of relief as you realise she is allowing you to leave, and you bow deeply to her before descending the stone steps.",
        nextText: 70,
        setState: { heardPrayer: true },
      },
    ],
  },
  {
    id: 59,
    text: "The dryad takes her time in looking you over, taking deep breaths of the air around your body - which you now suppose is scented with your fear - and eventually prods you with the tip of a stick-like finger. 'Dwarf,' she croaks in Common, 'Hollow skin. Open.'",
    options: [
      {
        text: "What on earth is she talking about? 'I'm afraid I don't understand,' you manage to whisper. You are very scared now.",
        nextText: 60,
      },
      {
        text: "She's going to kill you - hollow your skin! Quick, stab her!",
        nextText: 71,
        requiredState: (currentState) => currentState.gotKnife,
      },
    ],
  },
  {
    id: 60,
    text: "The dryad gestures at your side. 'Skin of deer. Hollow. Open.' Of course - your bag. It's deer leather, which naturally the dryad would recognise. You slowly and deliberately open the clasps of the satchel with shaking hands.",
    options: [
      {
        text: "Wait for the dryad to inspect the contents of your satchel. Is there anything in there she might want?",
        nextText: 61,
      },
      {
        text: "The owlbear gloves - that's what she must be looking for. Take them out and offer them to her.",
        nextText: 72,
        requiredState: (currentState) => currentState.gotGloves,
      },
      {
        text: "Maybe she's interested in the knife? Pass it to her, handle-first.",
        nextText: 56,
        requiredState: (currentState) => currentState.gotKnife,
      },
    ],
  },
  {
    id: 61,
    text: "You watch in horror as her hand rips through the leather of your satchel, spilling your possessions all over the grass. The dryad's trunk creaks as she twists to look at the objects, and you can hear her taking deep breaths. She says something, and it takes you a few seconds to understand her words as, 'Powder. You took. Where?' ",
    options: [
      {
        text: "'P-powder?' you stammer. 'I don't have any powder!'",
        nextText: 62,
      },
    ],
  },
  {
    id: 62,
    text: "'Powder! Mushroom powder! Where? You took. Give.' With a flood of understanding, you grasp her meaning. She is glaring down at you now, and you're sure you can actually see the twigs of her face knotting into a scowl.",
    options: [
      {
        text: "Your blood runs cold. You used the spores to distract the guard at the checkpoint. 'Ah,' you stammer, 'I d-don't have the powder! It's gone.'",
        nextText: 63,
        requiredState: (currentState) => !currentState.gotSpores,
      },
      {
        text: "Thank goodness you still have the spores from your last visit to this area - you had no idea the dryads had even seen you that time. You hunt through your bag for the little packet.",
        nextText: 64,
        requiredState: (currentState) => currentState.gotSpores,
      },
    ],
  },
  {
    id: 63,
    text: "She screeches, a bone-chilling shriek of squealing wood. 'OURS! NOT DWARF! STOLE!' You throw your arms up to protect your head and shout, 'I'm sorry! I'm sorry! Please!' but to no avail. The dryad batters you viciously with her clublike arms, yew-berries raining down on you.",
    options: [
      {
        text: "You can only hope that the enraged tree-guardian won't actually kill you as she finally lands a sickening thud on top of your skull, knocking you unconscious. ",
        nextText: 999,
      },
    ],
  },
  {
    id: 64,
    text: "The little paper envelope rests on your palm as you unsteadily offer it up to the towering tree-guardian. She bends a long way down to your hand and with unexpected dexterity, the packet is removed by two needle-tipped fingers. 'Why took?' she hisses.",
    options: [
      {
        text: "'It- I only intended to examine and catalogue them,' you say, and then when she says nothing you correct yourself to, 'I want to learn.'.",
        nextText: 65,
      },
    ],
  },
  {
    id: 65,
    text: "She seems to be thinking about your answer as she slits open the packet of spores and lets them drift away on the wind. 'Learn,' she finally says. 'Good. Dwarf. Here, why? Sacred place.'",
    options: [
      {
        text: "Lie, and tell her you got lost. You don't want to make her feel like she needs to defend her home.",
        nextText: 66,
      },
      {
        text: "Tell her that you only wanted to visit the ruins of the temple because you worship Sylvanus. Heretical, yes, but how could the Order ever find out?",
        nextText: 57,
      },
      {
        text: "You feel like you owe her the truth, so you explain that you're here to collect mushrooms, but that you'll leave as soon as you're finished.",
        nextText: 58,
      },
    ],
  },
  {
    id: 66,
    text: "You barely finish your sentence before she says, 'Stone trees. There,' and gestures towards the east, where the towers of Tiparos rise in the distance. 'Go. Many folk. Fire. Food.' She is clearly telling you to leave, and you are in no mind to disobey - particularly as you now see other dryads watching from the copse of trees surrounding the temple. ",
    options: [
      {
        text: "Count your lucky stars that you escaped this encounter without a scratch. Sylvanus must indeed have been watching over you today.",
        nextText: 999,
      },
    ],
  },
  {
    id: 67,
    text: "'I'm sorry,' you venture timidly. She just stares down at you until you feel compelled to say, 'When I was young, my family visited this place. We worshipped here, but the bad folk destroyed the temple. Now all folk have to pretend there is no Sylvanus, but I am still a druid in secret.' The dryad doesn't seem to understand what you've said, but you hope your tone and body language will help her see that you mean no harm. She becomes so still that if you didn't know, you would swear she really was a tree.",
    options: [
      {
        text: "Wait for her to respond.",
        nextText: 68,
      },
      {
        text: "Back away slowly.",
        nextText: 70,
      },
    ],
  },
  {
    id: 68,
    text: "You wait, and wait some more. You have no idea how much time passes, but the sun has definitely moved in the sky by the time the dryad seems to reawaken. She shakes her branches all over and wordlessly plucks a sprig of yew from one of her antlers, then hands it to you.",
    options: [
      {
        text: "Stretch your hand up and accept the yew from the dryad.",
        nextText: 69,
        setState: { gotYew: true },
      },
    ],
  },
  {
    id: 69,
    text: "She nods gravely as you tuck the yew sprig behind your ear, then turns with a swishing of needle-like leaves and gracefully moves away, towards the little copse behind the temple. The dryad seems to melt away as she reaches the shelter of the trees.",
    options: [
      {
        text: "Your heart is hammering, but it seems that you're finally in the clear. That was close - dryads can easily kill inexperienced adventurers.",
        nextText: 70,
      },
    ],
  },
  {
    id: 70,
    text: "As soon as you're down the first flight of stairs, you take a few moments to get your breath back. That was the most danger you've ever been in on one of your excursions, and the first time you've seen a dryad that close.",
    options: [
      {
        text: "Make a drawing of the dryad while the encounter is still fresh in your mind.",
        nextText: 82,
        requiredState: (currentState) => currentState.gotStationery,
      },
      {
        text: "Wait for your pulse to slow to a normal rate before continuing.",
        nextText: 83,
      },
    ],
  },
  {
    id: 71,
    text: "Your little knife skitters off the thick bark of the dryad's trunk before slipping harmlessly between two of the branches that make up her ribcage. The dryad shrieks wordlessly and clubs you with such force that you're lifted off the ground, sail through the air and hit your head on one of the stone blocks.",
    options: [
      {
        text: "The last thing you feel before you lose consciousness is the dryad's razor-sharp fingertips plunging through your tunic, leaving bloody gouges in your chest. That was a bad idea.",
        nextText: 999,
      },
    ],
  },
  {
    id: 72,
    text: "Digging through your bag, you draw out the owlbear leather gloves you'd bought that morning. The dryad fixes her gaze on them for a moment or two, then she swings her head to look at you instead. 'Skin.' ",
    options: [
      {
        text: "'Skin,' you agree carefully. 'Owlbear.'",
        nextText: 73,
      },
      {
        text: "'No, these are gloves. They're for protecting my hands, see?' Pull on the gloves and show her.",
        nextText: 74,
      },
    ],
  },
  {
    id: 73,
    text: "The huge tree-guardian lifts the gloves from your hands and sniffs them deeply. 'Owlbear. Skin. You kill?' She seems to be asking you whether you were the hunter of this particular owlbear.",
    options: [
      {
        text: "'Yes,' you lie smoothly. 'I hunted this owlbear, killed it and made its skin into gloves.' Hopefully she'll be impressed by your skills.",
        nextText: 75,
      },
      {
        text: "You decide to tell her the truth, and say, 'No. I bought these gloves this morning. I don't know who killed the owlbear.'",
        nextText: 76,
      },
    ],
  },
  {
    id: 74,
    text: "You lift the gloves to show the dryad, who seems entranced by the purplish leather. They do have a certain flair, you think to yourself as you admire the way the sun brings out the reddish glint of the hide. The dryad seems similarly enchanted, and says, 'Give.' Her tone makes it clear there is no refusing.",
    options: [
      {
        text: "'Here you go,' you say as you hand her the gloves, almost comically small in her hands. 'Please be careful,' you add, eyeing her long claws. ",
        nextText: 75,
      },
    ],
  },
  {
    id: 75,
    text: "She sniffs the gloves and makes a strange growling noise, which seems to end in a sob. 'Owlbear. You kill. Mine.' She growls again, clutching the gloves to herself, and lashes at you with her wooden talons. Too late do you notice the purple owlbear feathers stuck decoratively in her antlers, but as the dryad swipes at you again, you can't help but notice that her now-bloody fingers are tipped with owlbear claws, secured there with hardened tree-sap.",
    options: [
      {
        text: "'Dryads often bond to creatures resident in their territory. They prefer the company of predatory animals, and seem to value these relationships extremely highly, even welcoming those animals into their own circles. Indeed, there have been reports of dryads and wolves seen bringing down prey together.' - Moonshadow's Observations, p97",
        nextText: 999,
      },
    ],
  },
  {
    id: 76,
    text: "She doesn't seem to understand, so you try explaining more carefully that you traded gold for the gloves, and that you don't know where the leather came from or who killed the owlbear. The dryad shakes her head as if trying to clear it and clutches the gloves more tightly. You do need those gloves - what should you do?",
    options: [
      {
        text: "Try and convince her to give them back, maybe in exchange for something else?",
        nextText: 77,
      },
      {
        text: "Let her have them - you've seen what an angry dryad is capable of, and you don't want to be on the receiving end.",
        nextText: 81,
        setState: { gotGloves: false },
      },
    ],
  },
  {
    id: 77,
    text: "'Mine.' you say clearly, hoping that the dryad won't take it as a challenge. You don't know what kind of mushrooms you might find today, and you aren't foolhardy enough to try handling certain varieties without protective gloves. 'Mine,' she echoes. You open your bag again and rifle through it - is there anything in here which she might find more interesting?",
    options: [
      {
        text: "Aha - the new quills you bought earlier might catch her eye. They're long, straight and of excellent quality, and now you can see the owlbear feathers tucked into her antlers, you wonder if she might like some new ornaments.",
        nextText: 78,
        requiredState: (currentState) => currentState.gotStationery,
        setState: { gotStationery: false },
      },
      {
        text: "The little packet of spores you collected on your last visit might convince her to give you the gloves back. You seem to remember something about dryads in your copy of 'Fungi of the Far Realms'.",
        nextText: 79,
        requiredState: (currentState) => currentState.gotSpores,
        setState: { gotSpores: false },
      },
      {
        text: "The only thing in here she might possibly want is...your lunch. Lovingly prepared sandwiches: cheese and onion, vension and mustard, roast chicken, parsnip and apple, and your favourite - plain, raw mushroom. You sigh.",
        nextText: 80,
        setState: { noLunch: true },
      },
    ],
  },
  {
    id: 78,
    text: "You hesitantly offer the beautiful quills to the dryad, letting them rest flat on your palm so she can see them clearly. 'Do you want these?' you say, and she nods, reaching for them. 'Give me the gloves first, then you can have them.' She goes eerily still for a few moments, moving about as much as a real tree, while she appears to think it over. 'Dwarf. Give.' You hold your other hand out for the gloves, but the dryad is so busy staring at the quills that she just drops the gloves on the grass.",
    options: [
      {
        text: "Hold your breath as she picks the quills up one at a time, the tips of her disproportionately long fingers tickling your hand. Head down the steps into the temple while she's distracted.",
        nextText: 70,
      },
    ],
  },
  {
    id: 79,
    text: "'Give me the gloves,' you say carefully, 'and you can have this instead.' Her eyes alight on the paper envelope of spores. 'What?' she creaks. You carefully open the envelope and show her the glittering powder inside. 'Spores from a fruiting Needlepoint Amato fungus,' you begin enthusiastically, but you can see she doesn't understand, and amend yourself to 'Mushroom powder.' You didn't know it was possible for dryads to move so quickly, you reflect when you realise the towering yew-guardian has snatched the envelope out of your hands, dropping the gloves on the grass.",
    options: [
      {
        text: "You collect the gloves from the grass, and when you straighten up the dryad is sniffing the powder straight out of the packet. The branches on her head seem to be growing berries even as you watch - is this some kind of stimulant for dryads? Fascinating! But no time to watch - head down the steps into the temple while she's distracted.",
        nextText: 70,
      },
    ],
  },
  {
    id: 80,
    text: "You reluctantly withdraw the package of sandwiches from your satchel. Soft white bread, yellow butter, all your favourite fillings. You resign yourself to being hungry until you get back to Tiparos and open the package to show the dryad. 'You can have these if you give me the gloves,' you say, steeling yourself as her massive antlered head dips to sniff them. 'Food?' she creaks. You nod and give her a tight-lipped smile, some part of you hoping she's not hungry.",
    options: [
      {
        text: "With surprising dexterity, she shears off a neat section of the topmost sandwich and pops it into her maw. You didn't think it was possible for a face consisting of twisting twigs to show delight, but her pleasure is unmistakeable. She snatches the sandwiches and drops the gloves by your feet. Head down the steps into the temple while she's distracted.",
        nextText: 70,
      },
    ],
  },
  {
    id: 81,
    text: "As you back away from the towering creature, you silently mourn the loss of your brand-new gloves, but also reflect that you might have been in quite a lot of danger if you hadn't conceded them to the dryad. On balance, it's probably a good thing that you had a way to placate her and pass by safely - and you're sure Philustra will have another pair of gloves in her shop soon.",
    options: [
      {
        text: "That could have gone much worse. Time to head down into the temple, and hope that the dryad is gone by the time you need to leave.",
        nextText: 70,
      },
    ],
  },
  {
    id: 82,
    text: "You pull out the bottle of ink and one of your new quills and, working quickly, make a sketch of the dryad who had loomed over you. You estimate she was at least ten feet tall - by far the biggest dryad you'd ever seen. You can't help but be thrilled at your encounter, despite how much danger you were in.",
    options: [
      {
        text: "Put the sketchbook away and continue into the temple, now that you've calmed down.",
        nextText: 83,
        setState: { madeSketch: true },
      },
    ],
  },
  {
    id: 83,
    text: "Continuing on into the temple, the light from the entranceway fades, so you take a moment to illuminate your travel lantern. It wouldn't do to twist your ankle down here - especially since nobody knows where you are. You've been down in this temple's vault before, and despite your dwarven affinity for underground places and massive chunks of rock, not to mention your keen vision, it never fails to put a shiver up your spine.",
    options: [
      {
        text: "Proceed down the corridor into the temple crypt.",
        nextText: 84,
      },
    ],
  },
  {
    id: 84,
    text: "'Nothing to be scared of,' you remind yourself under your breath. You've never come across another creature down here, and once you've got what you came for you can just turn around and hurry back to Tiparos. The walls glisten greenly, reflecting the glow of your lantern, and you can hear a steady dripping in the distance. Hmm - you could have sworn there was no dripping last time you were here. Now what?",
    options: [
      {
        text: "Continue down the passageway into the vault and ignore the dripping.",
        nextText: 85,
      },
      {
        text: "That dripping is strange. Where could it be coming from? You can't help your curiosity, so you follow the sound - down the stone stairs to the left.",
        nextText: 86,
      },
    ],
  },
  {
    id: 85,
    text: "The stone passageway opens up into a large, low-ceilinged stone room. The walls are lined with empty torch brackets, and a smashed altar to Sylvanus sprawls at the far end. Every time you come here, you regret the damage the Order has done to the life you used to live. But no time for dwelling now, you've got mushrooms to pick. There are a few varieties growing in this room.",
    options: [
      {
        text: "There's a strong smell of...could that be...no. Surely not. It can't be...your mother's perfume?",
        nextText: 87,
        requiredState: (currentState) => !currentState.MemensDone,
      },
      {
        text: "Ooh, those glowing purple ones are Amethyst Jawbreakers! So-named because they turn rock-hard when cooked, but they're still a rare and valuable delicacy for those with strong teeth.",
        nextText: 88,
        requiredState: (currentState) => !currentState.JawbreakersDone,
      },
      {
        text: "You've never seen these ones before - they're long, cucumber-shaped and growing vertically down from the ceiling, like fleshy stalagtites.",
        nextText: 89,
        requiredState: (currentState) => !currentState.TubesDone,
      },
      {
        text: "Some very interesting varieties are growing in here, that's for certain, but until now you hadn't noticed the tiny white orbs dotted here and there around the room, which seem to be...floating?",
        nextText: 97,
        requiredState: (currentState) =>
          currentState.TubesDone &&
          currentState.JawbreakersDone &&
          currentState.MemensDone,
      },
    ],
  },
  {
    id: 86,
    text: "You're no more than a few steps down when a loose stone moves under your foot, sending you head-first down the stairs. The world spins around you and your lantern flies out of your hand, smashing against the stone. After what feels like an eternity, you land in a crumpled heap with every bone in your body hurting, but most of all your broken ankle. ",
    options: [
      {
        text: "You can't even haul yourself upright, let alone walk up all those steps. Shouting for help would be a waste of time. You really should have left Moggy a note, you reflect, your heart filling with dread.",
        nextText: 999,
      },
    ],
  },
  {
    id: 87,
    text: "You turn your head, taking deep breaths as you try to locate the source of that smell. You can barely think - how could it be possible? Your mother died during Lytheran's attack on Tiparos, along with your father and hundreds of other people, so how could she possibly be down here, in the vault of Sylvanus's temple? But that scent is unmistakeable. Plums, peppercorns and talcum. You'd do anything to see her again.",
    options: [
      {
        text: "Find her! The scent is stronger towards the northeast corner.",
        nextText: 90,
      },
      {
        text: "Try and clear your head - this is impossible.",
        nextText: 91,
      },
    ],
  },
  {
    id: 88,
    text: "The glow of the mushrooms adds to the light from your lantern, and you can now clearly see a large patch of the purple fungus covering a section of the floor, even up onto the walls. You step back in wonder. These particular shrooms are very valuable to gourmands, so you always look out for them, but you've never seen a patch this big before. This could make you seriously rich!",
    options: [
      {
        text: "The dryad's prayer seems to whisper through your mind - you'd better not be greedy. You'll just take a few.",
        nextText: 93,
        requiredState: (currentState) => currentState.heardPrayer,
      },
      {
        text: "You've hit the ultimate jackpot! Stuff every pocket you have, fill your boots, shove them under your hat!",
        nextText: 94,
        setState: { gotGreedy: true },
      },
      {
        text: "This seems too good to be true... Something is definitely off here. You won't touch the Amethyst Jawbreakers.",
        nextText: 85,
        setState: { JawbreakersDone: true, noJawbreakers: true },
      },
    ],
  },
  {
    id: 89,
    text: "You walk over to the patch of ceiling where the fungus are growing down towards you, careful not to stand underneath them. You have no idea what these are - which is rare - and you don't want to get dripped on. Fascinating! They seem to be tube-shaped, with a distinct frill of grey gills around the edges, and as you approach, the nearest one sends out a tiny gust of hot air.",
    options: [
      {
        text: "You're glad you have the gloves - pull them on and see if you can pluck one of the tubes. It'll be a stretch, but you can manage it.",
        nextText: 95,
        requiredState: (currentState) => currentState.gotGloves,
      },
      {
        text: "You really wish you had the owlbear gloves, but these look harmless enough. Reach up and break one or two off the ceiling.",
        nextText: 96,
        requiredState: (currentState) => !currentState.gotGloves,
        setState: { infected: true },
      },
      {
        text: "You've changed your mind - you'll go for something else instead.",
        nextText: 85,
        setState: { TubesDone: true },
      },
    ],
  },
  {
    id: 90,
    text: "The scent gets more and more powerful as you approach the corner of the room. Your mother is so close now, you know it! She must be right here. You're going to see her again! Your mind floods with memories of your childhood; your mother tending to your bumps and grazes, smiling as your father serves everyone soup, reading your favourite entomological encyclopedia to you at bedtime. You can almost see her face.",
    options: [
      {
        text: "The small, pink fungi growing in a patch of moss in front of you - you know your mother put them there just for you. She knows they're your favourite. You just need to have a bite and then you'll be with her. They're so delicious. Your mother misses you.",
        nextText: 92,
      },
    ],
  },
  {
    id: 91,
    text: "You take a deliberate step back and shake your head, and then it comes to you - Memens. There's a passage in 'Moonshadow's Observations' about these unassuming little fungi, which release a scent that muddles the mind of any creature in the area, making them unable to resist eating some. Unfortunately, Memens are horribly poisonous.",
    options: [
      {
        text: "Better stop up your nose with the sealing-wax in your satchel, and see what else might be growing in here.",
        nextText: 85,
        setState: { MemensDone: true },
      },
    ],
  },
  {
    id: 92,
    text: "You snatch up a handful of the unassuming little growths and cram them into your mouth, chewing vigorously. They're wonderful - juicy, fragrant, crisp as an apple, and even as your heartbeat slows and your breathing becomes laboured, you'd do anything for just one more taste.",
    options: [
      {
        text: "'Memens should be avoided at all costs. The scent is different to every person, but they never fail in drawing in even the strongest-willed folk. Eating even one results in death.' - Fungi of the Far Realms, p.554",
        nextText: 999,
      },
    ],
  },
  {
    id: 93,
    text: "Shaking open a drawstring canvas bag, you carefully select a few of the best-looking mushrooms and wiggle them free of the clinging moss. You'd better be careful with these - they're easily damaged, and you won't get nearly as much gold for bruised or broken ones.",
    options: [
      {
        text: "You hadn't expected to find Amethyst Jawbreakers here! You say a short prayer of thanks to Sylvanus and hope that there will still be some of these on your next visit.",
        nextText: 85,
        setState: { JawbreakersDone: true },
      },
    ],
  },
  {
    id: 94,
    text: "Great swathes of the floor and walls slowly become visible as you divest them of the fungal growths, which stop glowing as soon as they're picked. Luckily you still have the light of your travel lantern to see by as you cram handfuls of the Jawbreakers into every nook and cranny of your attire. You can't believe your luck - you're about to be very rich indeed.",
    options: [
      {
        text: "What an amazing stroke of fortune! Your clothing bulges with fungus, purple juice staining the fabric here and there. Moggy and Mortar can't possibly be angry with you for sneaking off to the temple when they're drinking from golden flagons!",
        nextText: 85,
        setState: { JawbreakersDone: true },
      },
    ],
  },
  {
    id: 95,
    text: "The long, white tubes are surprisingly sturdy, and it takes you a couple of tries to snap one off. You hold up the lantern to examine it and notice a fine black powder clinging to your gloves, which you brush off before bagging the white fungus. You'll have to look this up in your mycology encyclopedia when you get home.",
    options: [
      {
        text: "Right - should you look around to see if you missed anything?",
        nextText: 85,
        setState: { TubesDone: true },
      },
      {
        text: "That'll do for now. You've had quite enough of this eerie dungeon - let's head back to Tiparos.",
        nextText: 85,
      },
    ],
  },
  {
    id: 96,
    text: "Your curiosity overcomes your wisdom as you reach up and grasp one of the tubes in your bare hand. Immediately, the skin of your palm begins prickling and on lifting your lantern, you can see a fine black powder coating the areas where you gripped the fungus. Hmm.",
    options: [
      {
        text: "After a few seconds the prickling subsides, but the black powder seems to have stained your hand. How strange. Ah well - no harm done.",
        nextText: 85,
        setState: { TubesDone: true },
      },
    ],
  },
  {
    id: 97,
    text: "You stare at the floating spheres, which seem to shimmer as they reflect the light from your flickering lantern. They're no bigger than rowan berries, and they're definitely floating, you realise; you're sure they weren't there when you entered the room. Strange, but they don't seem to exhibit any of the warning signs you'd usually look for with an unknown fungus.",
    options: [
      {
        text: "You're definitely not touching these without gloves on, but you can't resist the urge to prod one - just to find out what happens.",
        nextText: 98,
        requiredState: (currentState) => currentState.gotGloves,
      },
      {
        text: "Lucky you've got those vials - you don't want to risk touching them, even with gloves on. Uncork a vial and scoop some in.",
        nextText: 99,
        requiredState: (currentState) => currentState.gotBottles,
      },
      {
        text: "Make a quick sketch and write down anything you can observe about the tiny orbs. You'll have a look in your encyclopedia later and see if you can identify them.",
        nextText: 100,
        requiredState: (currentState) => currentState.gotStationery,
      },
      {
        text: "You really want to take one of these home to identify it, but how? You don't want to touch it without gloves, and you don't have any glass vials...",
        nextText: 101,
        requiredState: (currentState) => currentState.noBottles,
      },
    ],
  },
  {
    id: 98,
    text: "Carefully extending your gloved hand, you touch one of the little blobs with a fingertip. Nothing seems to happen, except for its surface shimmering with a rainbow sheen as your finger connects. It bobs in the damp, still air, and you suddenly notice that there are hundreds of these things all around you. You're sure they weren't there a minute ago.",
    options: [
      {
        text: "Your skin prickles all over - this is very unsettling. They're obviously not sentient but you definitely do not like being surrounded. Time to make tracks.",
        nextText: 105,
      },
    ],
  },
  {
    id: 99,
    text: "The cork pops out of the vial's neck with an echo. Tongue between your teeth in concentration, you hold the lantern steady in one hand and swoop the vial through the air to catch some of the little round...things. You manage to get a couple and watch in fascination as they bounce off the glass walls, uncannily not hitting each other.",
    options: [
      {
        text: "A tiny shiver of excitement passes through you - you can't wait to get home and study these!",
        nextText: 105,
      },
    ],
  },
  {
    id: 100,
    text: "Opening up your sketchbook, you leaf through to find a good spot to write some observations, and your heart stops for a moment as you see a drawing of lots of tiny round orbs surrounded by notes. That's your handwriting. This is your handiwork, but you have no idea when you made this sketch. You have no memory of doing so.",
    options: [
      {
        text: "How could this be possible? Look through your sketchbook for clues. Maybe you wrote something down that will help you piece this together.",
        nextText: 102,
      },
    ],
  },
  {
    id: 101,
    text: "Do you dare to just...touch it? It doesn't look dangerous at all - it's just a pearl floating in the air in front of you. What's the worst that could happen?",
    options: [
      {
        text: "No way! You've read enough of 'Moonshadow's Observations' to know that touching an unknown specimen would be a very bad idea.",
        nextText: 103,
      },
      {
        text: "It's so pretty, and you can't see any spores in the air around it, let alone any spots or gills. If it wasn't floating, it would be easily mistaken for a tiny puffball, and you've eaten more of those than you can count.",
        nextText: 104,
      },
    ],
  },
  {
    id: 102,
    text: "You turn back a few pages, and see another drawing of the same floating fungus. Further back is another sketch, and another ten pages before that. How many times have you been here before? How many times have you encountered these things, and why can't you remember doing so? This is very strange. You've never heard of a mushroom affecting memory before, except as a prelude to death by poisoning.",
    options: [
      {
        text: "Closing the sketchbook with a snap and tucking it in a safe pocket inside your cloak, you decide it's time to leave. Right now. This is just too odd.",
        nextText: 105,
      },
    ],
  },
  {
    id: 103,
    text: "It's probably for the best that you resist the urge to poke one of the iridescent orbs, but you can't help feeling a frisson of disappointment. You've never seen these before - which is saying something considering how extensively you've studied mycology - and there's nothing you'd love more than having a fungus named after you. Maybe these would be called 'Miracle's Puffballs'.",
    options: [
      {
        text: "You sigh, arranging your cloak more comfortably on your shoulders, and resolve to bring some vials next time you visit. Time to head home.",
        nextText: 105,
      },
    ],
  },
  {
    id: 104,
    text: "What harm could this little thing possibly do? You gingerly poke it with the very tip of your finger, and when nothing happens you tap it more firmly. It spins away but you reach out to enclose it in your palm before it gets too far and lift it to your eyes to inspect it more closely. It really is quite beautiful, even it does smell somewhat odd.",
    options: [
      {
        text: "As carefully as you can, you slip it into a safe pocket inside your cloak. You can't pass this opportunity up.",
        nextText: 105,
      },
    ],
  },
  {
    id: 105,
    text: "As always, you do a final check of yourself and your satchel before you head out of the temple. Seems like you've got everything you came with, at least, and that's what matters. You tend to lose track of time when you're on one of your expeditions, so it's probably past time you were heading back to Tiparos. You push worries of getting back into the city out of your mind for now.",
    options: [
      {
        text: "Retrace your steps through the crypt and back up the stairs to the ruins of the temple.",
        nextText: 106,
      },
    ],
  },
  {
    id: 106,
    text: "Your dwarven heritage means that it takes your eyes a while to adjust to the harsh light of day outside the gloom of the temple, but you can't mistake the massive shape looming over you - twisted branches, cloven hooves, the uncanny feeling of being watched despite the figure having no face to speak of - blinking up at it, your eyes swim until you recognise the form of a dryad. She doesn't seem to be moving, and you wonder if she's actually awake.",
    options: [
      {
        text: "You thank Sylvanus you heeded the dryad's warning and didn't take too many of the Amythyst Jawbreakers. You're sure that couldn't have ended well for you, even if you're reasonably certain this isn't the same dryad you met earlier.",
        nextText: 107,
        requiredState: (currentState) => currentState.heardPrayer,
      },
      {
        text: "The dryad doesn't seem to be aware of you. Edge past her, horribly aware that your clothes are stained with juice from the Jawbreaker fungus.",
        nextText: 108,
        requiredState: (currentState) => currentState.gotGreedy,
      },
      {
        text: "Walk past her as slowly and quietly as you can. You're painfully aware that dryads have very quick tempers and you definitely don't want to provoke hers.",
        nextText: 109,
        requiredState: (currentState) =>
          !currentState.gotGreedy && !currentState.heardPrayer,
      },
    ],
  },
  {
    id: 107,
    text: "You hold your breath as you edge towards the looming figure. Gazing up at her, you can't help but feel a sense of wonder and curiosity wrapped up in your wariness. Dryads and druids have a long, long history of mututal respect (whether friendly or not), and you've never had the opportunity to form a friendship with one before.",
    options: [
      {
        text: "Dryads are very dangerous and notoriously quick to anger, and you barely escaped your last encounter with your life! Navigate your way through the ruins, and hope that you have another chance to speak to a dryad on your next trip outside Tiparos.",
        nextText: 110,
      },
      {
        text: "You might never see a dryad this close again - it would be foolish not to try and speak to her, at least.",
        nextText: 111,
      },
    ],
  },
  {
    id: 108,
    text: "As quietly as you can, you try moving past the dryad. She must be at least twice as tall as you, and you recognise the large spines covering her limbs - this is a hawthorn guardian, one of the most dangerous types - your stomach drops. As if woken by your fear, she suddenly whips a branch towards you to hold you in place.",
    options: [
      {
        text: "Don't struggle - you don't want to make this very bad situation any worse, even if she is lifting you off your feet and bringing you closer to her thickly-foliaged head.",
        nextText: 114,
      },
    ],
  },
  {
    id: 109,
    text: "Heart hammering, you take one small step at a time past the unmoving tree-spirit, cringing every time the wind rustles her impressively verdant branches. Nothing happens as you move past her. You can scarcely believe your fortune as you step out of her shadow and into the sunlight. It's a clear path from here to the outer edge of the temple ruins, and you're not overly keen on dallying.",
    options: [
      {
        text: "Take a bold step into the sun, grateful for the warmth after the dank temple.",
        nextText: 123,
        requiredState: (currentState) => currentState.infected,
      },
      {
        text: "Take a bold step into the sun, grateful for the warmth after the dank temple. ",
        nextText: 110,
        requiredState: (currentState) => !currentState.infected,
      },
    ],
  },
  {
    id: 110,
    text: "You silently thank your mother for failing to raise a fool as you increase your pace to a comfortable clip, and even if you would have loved to talk to the dryad, you recognise that doing so could have made this day a lot worse. The sun has swung alarmingly in the sky and you'd really like to be home before sunset, so you don't dawdle on your way back to Tiparos.",
    options: [
      {
        text: "Right - no more tarrying. Homeward bound, off you go!",
        nextText: 127,
      },
    ],
  },
  {
    id: 111,
    text: "But what do you say to an ancient spirit of the forest? 'Hello, I'm Miracle, what's your name? I like your berries!' The thought makes you chuckle, and the dryad suddenly springs to life. Her branches creak as she swings her head towards you, and your blood turns cold. She really is very tall. 'Dwarf,' she creaks, 'Hungry. Eat,' and takes a loping stride towards you.",
    options: [
      {
        text: "'Wait! I have food!' You pull a squashed package of sandwiches out of your satchel and thrust it towards her.",
        nextText: 112,
        requiredState: (currentState) => !currentState.noLunch,
      },
      {
        text: "Oh gods, oh no, Sylvanus save you! Despite all you've read about them, you had no idea dryads had a taste for folk-flesh - fascinating, but terrifying. You freeze in fear, unable to run.",
        nextText: 113,
        requiredState: (currentState) => currentState.noLunch,
      },
    ],
  },
  {
    id: 112,
    text: "She snatches the parcel, shredding the paper wrapping, and sniffs the food before cramming a handful of bread into the gap between twigs at the approximate location of a mouth. The carefully-constructed fillings spill all over the stone at your feet and you waste no time in scarpering while she's distracted by the sandwiches.",
    options: [
      {
        text: "Run as fast as your dwarven legs will carry you!",
        nextText: 127,
      },
    ],
  },
  {
    id: 113,
    text: "You murmur a hasty prayer to Sylvanus as the dryad advances on you. The ground seems to shake as she draws closer, but it could just be your body trembling in fear. She looms over you and seems to expand in size as she unknits the branches that make up her body, preparing to strike with a limb covered in razor-sharp spines.",
    options: [
      {
        text: "Curl into a ball and pray like you've never prayed before.",
        nextText: 115,
      },
      {
        text: "You made a drawing of the yew-dryad earlier - maybe it'll distract her long enough for you to escape! Yank it out of your satchel and show it to her.",
        nextText: 116,
        requiredState: (currentState) => currentState.madeSketch,
      },
      {
        text: "At the last moment, you remember the twig of yew the dryad from earlier bestowed on you. You have no idea whether it'll help, but you're desperate, so you pull it out from behind your ear and thrust it towards her. ",
        nextText: 117,
        requiredState: (currentState) => currentState.gotYew,
      },
    ],
  },
  {
    id: 114,
    text: "You scream in shock as much as in pain as the dryad sinks her long, sharp spines into your flesh. 'DWARF! Greedy and selfish! Took too much!' Dryads don't have faces, so to speak, and therefore don't have mouths, but they certainly seem to have teeth.",
    options: [
      {
        text: "Of all the ways you could have come to an untimely demise, you wouldn't necessarily have bet on being eaten alive by a massive, enraged dryad. If only you hadn't been so greedy.",
        nextText: 999,
      },
    ],
  },
  {
    id: 115,
    text: "Thank all the gods (but especially Sylvanus) that you brushed up on the traditional prayers as part of your research. Your words make the dryad halt in place, even though you're sure you must be mispronouncing at least half of them. She (or he? or they? You're not sure) furls and unfurls her leaves as you look up at her and a couple of berries drop from her branches.",
    options: [
      {
        text: "Slowly uncurl - you're pretty sure she won't hurt a devotee of the god of wild nature. Time to get out of here.",
        nextText: 127,
      },
    ],
  },
  {
    id: 116,
    text: "The hawthorn-dryad gazes (or seems to gaze) at the piece of paper hastily shoved in her direction, not seeming to understand what it depicts, then grabs it and lifts it to inspect it more closely.",
    options: [
      {
        text: "Try to explain what the drawing shows - if the dryad can understand what a drawing actually is.",
        nextText: 118,
      },
      {
        text: "The dryad is distracted. You might not have a better time to escape.",
        nextText: 127,
      },
    ],
  },
  {
    id: 117,
    text: "The little sprig of yew in your hand seems to shiver and grow oddly warm as you hold it out towards the dryad. You look down in alarm as you feel a prickling sensation in your fingers, and then back up at the dryad - she is doing something, but you can't tell what. All you know is that the prickling is growing steadily more intense and spreading into your wrist, although...it isn't unpleasant.",
    options: [
      {
        text: "Drop the yew twig and run!",
        nextText: 125,
      },
    ],
  },
  {
    id: 118,
    text: "'It's a sketch,' you attempt to explain. 'This is a dryad, like you. See?' Silently you pray that the dryad won't be offended by your slightly clumsy depiction. 'Dwarf,' the dryad croaks, 'you make?' Your mouth is dry as you reply, 'Yes, I make.' The dryad seems to think for a moment and says, 'How?'",
    options: [
      {
        text: "'With ink, and a pen, and some paper,' you babble, withdrawing those items from your satchel to show her.",
        nextText: 119,
      },
    ],
  },
  {
    id: 119,
    text: "The dryad doesn't sit, exactly, but she rearranges the wooden branches that make up her body so that she is much closer to your height, and rests part of her lower limbs on a rock. 'Show,' she says in her rustling voice. You have never even heard of a dryad being interested in folk-craft, so this isn't an opportunity to miss!",
    options: [
      {
        text: "Load your pen with ink and begin sketching a Mousebane flower, which are plentiful in these parts.",
        nextText: 120,
      },
    ],
  },
  {
    id: 120,
    text: "Before long, a decently accurate illustration of the flower appears on the page. The dryad remains transfixed the entire time, and you're uncomfortably aware of her head drooping closer and closer to the paper resting on your lap. 'Dwarf,' she says when you're finished, 'come. Clan. Show.' Wait - is she asking you to come back to her dryad clan?",
    options: [
      {
        text: "'Oh, er, I can't, I'm sorry. I have to go home,' you explain - the mushrooms you collected won't last forever.",
        nextText: 121,
      },
      {
        text: "This is an incredible honour! You have heard of folk forming cordial relationships with dryads, and never imagined you could become a friend of the dangerous creatures.",
        nextText: 122,
      },
    ],
  },
  {
    id: 121,
    text: "The dryad doesn't look disappointed, or even angry (honestly, you're not sure her spriggan face could actually make those expressions) - she simply resumes her usual height and begins slowly loping away to the nearby copse of trees without looking at you. You dearly hope you haven't offended her.",
    options: [
      {
        text: "That'll be something to consider next time you want to come to the temple - but for now, it's time to get home.",
        nextText: 127,
      },
    ],
  },
  {
    id: 122,
    text: "'Come with you? To your clan? Now?' you blurt excitedly. The dryad gestures into a nearby copse of trees, where you can just about make out some tree-like shapes moving rather more than trees ordinarily should. 'Dwarf come clan. Show skesh. Make clan skesh. Now,' the dryad replies, and as she looks down at you, you're sure you can see some new bright-green shoots appear in her branches.",
    options: [
      {
        text: "This is wonderful! Forget Tiparos, forget Moggy and Mortar, forget mushrooms! You're off to join the dryads!",
        nextText: 999,
      },
      {
        text: "You realise that actually, you quite like your cosy life in Tiparos - and the dryads will always be here. Explain to her that you really do have to go home.",
        nextText: 121,
      },
    ],
  },
  {
    id: 123,
    text: "The light of the sun isn't something dwarves usually seek, but you've lived above ground your whole life and have come to appreciate the balm its touch gives you. Ah, yes, the warmth. The heat. The...burning! You touch your face in alarm and recoil in horror at the feeling of tiny tentacle-like growths covering your skin. Your hands are sprouting the white growths as you look down at them, each one wriggling horribly.",
    options: [
      {
        text: "Panic sets in as every inch of your body feels like it's on fire. You try desperately to scrub your hands free of the little worm-like protuberances.",
        nextText: 124,
      },
    ],
  },
  {
    id: 124,
    text: "'Infestations of Coaldust Cannula are rare, but exceedingly hazardous. Individual Coaldust Cannula can grow up to 18 inches per day and usually latch to ceilings of cellars and basements, releasing black, powder-like spores when touched. A creature infected with the spores, when exposed to sunlight, will immediately grow protrusions of the fungus throughout their circulatory system and skin surface, which is inevitably fatal. The author recommends urgent eradication of any hyphae or primordia; consider also retaining a pair of rats in the home, which are known to be sensitive to the spores.' - Fungal Oddities, Gregorius Gartho",
    options: [
      {
        text: "An uncomfortable end, certainly, but at least it was quick.",
        nextText: 999,
      },
    ],
  },
  {
    id: 125,
    text: "You open your hand to drop the twig, but it seems to be stuck to you. You shake your hand vigorously, but the twig isn't just stuck to you - it's attached to you! Desperately trying to pull it off your hand, you only screech with pain as if you'd tried to pull out a handful of your own hair. The dryad gently touches the twig with a massive finger and...you can feel her, as if the little branch is part of your body. What in the Realms is happening?!",
    options: [
      {
        text: "The twig seems to be - no, it can't be...growing? What has the dryad done?",
        nextText: 126,
      },
    ],
  },
  {
    id: 126,
    text: "Faster than you've ever seen anything grow before, the yew sprig sends out two more shoots, and two of your fingers shrivel to bones and blacken, dropping onto the grass. You scream in horror as your whole body is encroached upon by the yew, though strangely there is no pain at all. Scraps of ripped wool and cotton garments surround your feet, and your vision doubles, then fades before clearing. The dryad looks down at you, and somehow you can understand that she feels...pride, and welcoming.",
    options: [
      {
        text: "You inspect your hands and arms in wonder - where you were flesh and blood, you are now living wood and pulsing sap. The sudden sense of connection to the tiny lives in the landscape all around you is almost overwhelming, but as you soak in the nourishment of the sun, all you feel is peace.",
        nextText: 999,
      },
    ],
  },
  {
    id: 127,
    text: "This has certainly been a more eventful trip to the temple than usual, you reflect as you set a steady pace back towards the city, and you straighten your hat to sit more securely on your head. Getting back through the checkpoint hopefully won't be too much of a problem, and Moggy and Mortar are likely to be so busy with the post-assembly rush that they won't notice you slip back into the Rose & Respite.",
    options: [
      {
        text: "Make a bee-line back to the city gates. These mushrooms won't study themselves!",
        nextText: 128,
      },
      {
        text: "On second thoughts, maybe you should hang around a bit. If the checkpoint guard hasn't changed, you might be recognised.",
        nextText: 129,
      },
      {
        text: "Suddenly you remember your deal with Philustra. Damn it! You totally forgot until now, but you know she'll stick to her word and tell Miracle about your excursion if you don't find some Smokecaps for her.",
        nextText: 130,
        requiredState: (currentState) => currentState.madeDeal,
      },
    ],
  },
  {
    id: 128,
    text: "Dwarven vision isn't the keenest, particularly in daylight, so you can't tell whether the guard staffing the gate is the same one who was there earlier as you approach the checkpoint booth. It's very likely - but not certain - that the shift has changed since you were last here, and a young dwarf all by herself, with a purple beard and a satchel bulging with mushrooms, isn't terribly inconspicuous.",
    options: [
      {
        text: "Take your chances and stroll casually through the gate. The guard might not spot you.",
        nextText: 131,
      },
      {
        text: "Go straight up to the checkpoint desk and hope you can bluff your way through the inevitable questions. Confidence is key!",
        nextText: 136,
      },
    ],
  },
  {
    id: 129,
    text: "You happen to know that there's a small tavern tucked out of the way down a side road, which you've visited a fair few times. Turning on the spot, you hurry down to the Dragon's Return - so named because of the ancient rumours that this part of Malrad-Jint was home to a terrible dragon, whose spirit still haunts the countryside.",
    options: [
      {
        text: "You'll just have a pint or three and then head back to the Rose & Respite once the guard has definitely changed shift.",
        nextText: 154,
      },
    ],
  },
  {
    id: 130,
    text: "Having dealt with Philustra quite a few times over the past year, you know that her reputation for light blackmail is well-deserved. She's got you more or less over a barrel - you'll be in deep dung with Moggy if Philustra tells her what you've been up to, even if you do have a sneaking suspicion that there are certain things Moggy isn't telling you. You'd better find her Smokecaps; or try to, at least.",
    options: [
      {
        text: "Smokecaps usually grow on rocks, and as luck would have it, the walls around Tiparos are made of big stone blocks. Look around to see if you can spot any.",
        nextText: 174,
      },
    ],
  },
  {
    id: 131,
    text: "Putting one surprisingly large foot in front of another, you attempt to look nonchalant as you walk towards the open gates - though you're actually praying to Silvanus that the guard is too engrossed in that morning's newspaper to notice you. Silvanus must not be listening today, however, because a bark of 'Excuse me! Madam!' issues from the checkpoint desk.",
    options: [
      {
        text: "You're pretty fast for a dwarf, so you could run and hope the guard can't be bothered to chase you.",
        nextText: 132,
      },
      {
        text: "Uh-oh. You'll get in more trouble if you try to evade checking in, so you should really go over to the desk.",
        nextText: 136,
      },
    ],
  },
  {
    id: 132,
    text: "You thank your lucky stars that you wore your sensible culottes today, hitch the length of your robe up to your waist to free your legs for running, then make a dash towards the gate. Unfortunately, you only manage to take a few strides before a guard hurtles out of a side door into your path, arms spread wide in readiness to catch you.",
    options: [
      {
        text: "Dodge left, past the open door!",
        nextText: 133,
      },
      {
        text: "Feint left, then dodge right! You're cunning like a fox!",
        nextText: 134,
      },
      {
        text: "Stick your hand in your satchel and throw the first thing you can grab at the guard!",
        nextText: 135,
      },
    ],
  },
  {
    id: 133,
    text: "You dodge to the left, narrowly avoiding the guard's grasping fingers, and run as fast as you possibly can through the streets of Tiparos. You hear a huffing and a puffing behind you as the guard attempts to chase you down, but easily outpace her (despite being a dwarf, when she seemed to be a half-orc - the Order really needs to step up the quality of its security detail). Now what?",
    options: [
      {
        text: "Go straight back to the Rose & Respite. The guard is nowhere to be seen, although more than a few heads turn with your passing.",
        nextText: 153,
      },
      {
        text: "Better safe than sorry - you'll hide out in a shop or something until the heat is off.",
        nextText: 180,
      },
    ],
  },
  {
    id: 134,
    text: "Pacing determinedly towards the guard, you bait her into thinking you're about to dodge left, then at the last moment you strafe right, trip over your own feet, and crash spectacularly to the ground. You skid for at least a meter before the guard jumps on top of you, pinning you to the ground.",
    options: [
      {
        text: "You let out a string of dwarven curses that would make a miner blush as another guard piles on top of you. That'll teach you to try and be clever.",
        nextText: 999,
      },
    ],
  },
  {
    id: 135,
    text: "No time to grope around in your bag - you stick your hand in and grab your lantern, dashing it at the guard's feet. Time seems to slow down as it shatters all over her, greasy paraffin coating her leggins and tunic and glass shards shooting in every direction, and you sail past her as she turns and slips on a pool of oil. Beth gave you that lantern for your birthday, but you're sure she would understand.",
    options: [
      {
        text: "No regrets - you'll just have to thank Beth later. Now run!",
        nextText: 153,
      },
    ],
  },
  {
    id: 136,
    text: "You inwardly sigh with relief. The guard who is currently staffing the checkpoint desk is definitely not the lanky human who was there this morning. The relief is short-lived, however, as the blond guard squints at you, then down at the desk, then back at you. 'Good afternoon, madam. I'm under orders to question any dwarves entering Tiparos before nightfall. Your name, and the reason for your visit please?'",
    options: [
      {
        text: "'It's Miracle Gra'zithar,' you reply promptly, deciding not to lie if you can help it. Perhaps your Lucenic forename will deflect suspicion.",
        nextText: 137,
      },
      {
        text: "Tutting ostentatiously, you snap, 'Mistress Prudence-Is-To-Be-Humbled-And-Worship-Before-Him! You should know who I am! This won't do at all.'",
        nextText: 152,
        requiredState: (currentState) => currentState.disguised,
      },
      {
        text: "'Um, it's...Sapphire Deepdigger,' you lie quickly. Best not to draw any attention to Moggy and Mortar.",
        nextText: 148,
      },
    ],
  },
  {
    id: 137,
    text: "'Miracle, eh? Rings a bell...one moment. KENNETH!' the guard roars, and a huge orc appears from a side room - so tall that he bashes his head on the ceiling lamp before stooping to the blond guard's level to allow his ear to be whispered in. He looks you up and down, then grunts and retreats into the side room. Your heart is hammering now - you're busted, you're sure of it.",
    options: [
      {
        text: "Take your chances and run!",
        nextText: 132,
      },
      {
        text: "Stand your ground. You're not sure what this is about, but you don't want to make it any worse for yourself.",
        nextText: 138,
        requiredState: (currentState) =>
          !currentState.disguised && !currentState.recognisedAtGate,
      },
      {
        text: "Stand your ground. You're not sure what this is about, but you don't want to make it any worse for yourself.",
        nextText: 139,
        requiredState: (currentState) =>
          currentState.disguised || currentState.recognisedAtGate,
      },
    ],
  },
  {
    id: 138,
    text: "The blond guard looks at his desk again, then seems to make a decision, smiles, and says, 'Sorry to trouble you, madam. Please proceed, and praise Lucene.' Scarcely believing your luck, you make the sign of the Order and hurry through the massive stone gates, not daring to look up from your boots.",
    options: [
      {
        text: "Don't look a gift unicorn in the mouth - get a move on!",
        nextText: 153,
      },
    ],
  },
  {
    id: 139,
    text: "'Kenneth seems to think that you bear an awfully close resemblance to a person of interest, depicted on this poster here,' the guard smirks as he holds up a piece of parchment showing a surprisingly good sketch of...you. Dung and double dung. You hitch a look of innocent confusion onto your face as the guard says, 'Now, we can do this the easy way, or the hard way. Your choice,' ",
    options: [
      {
        text: "'The, er, easy way please,' you mutter, knowing that you are definitely in deep trouble now.",
        nextText: 140,
      },
      {
        text: "'I'm sorry, there must be some mistake here. I've done nothing wrong,' you say, trying to keep your voice calm.",
        nextText: 148,
      },
    ],
  },
  {
    id: 140,
    text: "The guard leans back on his high-backed stool and grins, saying, 'I'm pleased to hear you say that. Very sensible young lady, aren't you? And I'm sure you won't object to a routine search, either.' The guard leans down and puts out his hand for your bag, which you grudgingly relinquish. Opening the brass clasps, he says, 'And what do we have here? Oh my, my, my.'",
    options: [
      {
        text: "You stare up at the guard gleefully pawing through your personal affects, hating him, but unable to do anything (except heap silent curses upon him).",
        nextText: 141,
        requiredState: (currentState) => currentState.gotKnife,
      },
      {
        text: "You stare up at the guard gleefully pawing through your personal affects, hating him, but unable to do anything (except heap silent curses upon him).",
        nextText: 142,
        requiredState: (currentState) =>
          (currentState.gotGreedy || currentState.heardPrayer) &&
          !currentState.noJawbreakers,
      },
      {
        text: "You stare up at the guard gleefully pawing through your personal affects, hating him, but unable to do anything (except heap silent curses upon him).",
        nextText: 143,
        requiredState: (currentState) => currentState.gotSpores,
      },
      {
        text: "You stare up at the guard gleefully pawing through your personal affects, hating him, but unable to do anything (except heap silent curses upon him).",
        nextText: 144,
        requiredState: (currentState) =>
          !currentState.gotSpores &&
          !currentState.heardPrayer &&
          !currentState.gotGreedy &&
          !currentState.gotKnife,
      },
    ],
  },
  {
    id: 141,
    text: "He pulls out the beautiful silver dagger Philustra sold you only that morning, turns it over a few times, and says, 'Very nice bit of gear, this. Unfortunately however, I can't allow you to carry weapons into our city. Ah-' he holds up a finger at your stuttered protest, 'it is my sworn duty to preserve the safety of Tiparosian citizens. And to divest fools of their valuables on occasion. Now, please proceed through the gate.' He gestures towards the city and immediately begins cleaning his fingernails with the knife.",
    options: [
      {
        text: "You give him the dirtiest look you can muster - that knife was brand new - and walk stiffly through the gate.",
        nextText: 153,
      },
    ],
  },
  {
    id: 142,
    text: "'Oh-ho-ho! What have we here?' The guard says, pulling the bag of Amethyst Jawbreakers out of your satchel. 'Ten gold apiece to the right seller, if I'm not mistaken. Anyone would think you were bribing me...but as luck would have it, today is my birthday, and you've very thoughtfully bought me a gift. Haven't you?' he sneers, sparing you a glance before inspecting the mushrooms more closely.",
    options: [
      {
        text: "'Yes,' you spit through gritted teeth. 'Happy birthday.' You turn and stomp through the gate without waiting for permission. Greedy bastard.",
        nextText: 153,
      },
    ],
  },
  {
    id: 143,
    text: "'And what could this be?' the guard says, pulling out the little packet of spores. He turns it over, sniffs it, and says, eyes wide, 'I'm not overly sure that you should be in possession of this, young madam.'",
    options: [
      {
        text: "Say nothing.",
        nextText: 145,
      },
      {
        text: "Try to stop him opening the packet.",
        nextText: 146,
      },
    ],
  },
  {
    id: 144,
    text: "You stifle a gasp as he pulls out your notebook. Your notebook, which is filled with notes and sketches from your very illegal druidic experimentation. Your notebook, which alone would be enough to convict you of being a user of the arcane arts, and lead to a lengthy spell in prison, if not exile - or worse. You have moments to act - what do you do?",
    options: [
      {
        text: "Snatch the notebook back and run for your life!",
        nextText: 132,
      },
      {
        text: "Don't do anything - you might be able to bribe him, or talk your way out of this.",
        nextText: 147,
      },
    ],
  },
  {
    id: 145,
    text: "He carelessly tears open the paper envelope, and in the process manages to tip the spores all over himself; letting out a fluent stream of curses, he leaps up from his stool and tries frantically to brush the powder from his clothes. Unfortunately, the only effect of this is that he spreads them even more completely over his torso and thighs - not at all desirable, since the spores are from a Pissenlit toadstool - and immediately wets himself.",
    options: [
      {
        text: "You try to look earnestly embarrassed and confused as the guard waves you through, cringing.",
        nextText: 153,
      },
    ],
  },
  {
    id: 146,
    text: "'Pardon me, but-' you begin, but the guard cuts you off with a bark of 'Please remain silent! I'm conducting an official search of your belongings as per Order law, and you wouldn't want to cause any trouble, would you?' As you shake your head, the guard nods imperiously and returns to the envelope, trying to delicately remove the wax seal without much success.",
    options: [
      {
        text: "You tried to warn him! Now you just have to await the inevitable.",
        nextText: 145,
      },
    ],
  },
  {
    id: 147,
    text: "The guard opens your notebook at random, squinting at the cramped handwriting and overlapping notes which cover every inch of the page, interspersed with sketches and the occasional pressed specimen. He turns it upside down with a baffled look on his face, then rights it, and flicks through a few more pages before his eyes widen in horror. 'This...this is-' he begins, before the book is jerked out of his hands by a figure you hadn't noticed until they stepped forward from the back of the booth.",
    options: [
      {
        text: "'That's not mine!' you shout desperately, blood turning to ice.",
        nextText: 148,
      },
    ],
  },
  {
    id: 148,
    text: "'I'll take it from here, Lorian, with thanks,' says a voice like honey overflowing its comb. The figure is tall and slim, and you're surprised to note that she isn't wearing the sky-blue robes the members of the Hand of Lucene are required to don while on duty, but rather a short tunic and leggings, both the colour of cream, with a gold-lined sash crossing her chest. You don't recognise this person, but she's clearly a very important member of the Order - perhaps even one of Alaster's personal company.",
    options: [
      {
        text: "You're sure you must be in the deepest of dung now. If it had just been the guard - Lorian - to contend with, you might have been able to wriggle out of trouble.",
        nextText: 149,
      },
    ],
  },
  {
    id: 149,
    text: "'What did you say your name was?' she asks, looking at you a little more closely. You decide in a split second not to lie; there's something oddly familiar about this woman, with her shining black hair and sandy skin. 'Miracle Gra'zithar,' you mumble, but to your astonishment her eyes widen in recognition and she clearly fights to keep a grin off her face. She nods curtly and says, 'No need for concern, Lorian. I'd like a mint tea, please,' dismissing him to the side room of the booth. He hurries off with a nervous expression, not looking back.",
    options: [
      {
        text: "Who is this woman, and what does she want with you?",
        nextText: 150,
        requiredState: (currentState) => currentState.madeSketch,
      },
      {
        text: "Who is this woman, and what does she want with you?",
        nextText: 151,
        requiredState: (currentState) => !currentState.madeSketch,
      },
    ],
  },
  {
    id: 150,
    text: "The woman snaps the notebook shut and weighs it in her hand. 'Sister to Moggy and Miracle Gra'zithar, I presume?' she asks, and speaking a little louder than necessary, she continues at your nod, 'Of the Rose and Respite, of course. Well, I see no harm in returning your property, as you clearly haven't broken any laws in your research.' Her voice drops significantly as you reach for the book, scarcely believing your luck. 'Miracle, you must be more cautious. This is no game - you are in danger, and so is Moggy.' Before you can say anything, she hands over the book and points through the gate. 'Praise Lucene,' she says at a normal volume.",
    options: [
      {
        text: "You have so many questions! But now isn't the time - you'd better go.",
        nextText: 153,
        setState: { metSandalpha: true },
      },
    ],
  },
  {
    id: 151,
    text: "The woman looks down at you from the raised desk of the checkpoint booth. 'Sister to Moggy and Miracle Gra'zithar, I presume?' she asks, raises her voice slightly, and continues, 'Of the Rose and Respite, of course. An honourable family. I was saddened when your parents fell to Lytheran,' Her voice drops significantly as she leans forward. 'Miracle, you must be more cautious. This is no game - you are in danger, and so is Moggy. Quick - go straight home.' She points towards the city with one elegant finger. 'Praise Lucene,' she says at a normal volume.",
    options: [
      {
        text: "You have so many questions! But now isn't the time - you'd better go.",
        nextText: 153,
        setState: { metSandalpha: true },
      },
    ],
  },
  {
    id: 152,
    text: "'Mistress...Humbled...' the guard murmurs as he runs his finger down a thick ledger. Your heart stops as you notice, pinned to the board behind the guard, a sketch which unmistakably depicts a young dwarf with a braided beard and a patched hat. It's a drawing of you, with the words 'PERSON OF INTEREST' underneath. He makes an uncertain sound and says, 'I can't read this bloomin' handwriting! Your name again please?'",
    options: [
      {
        text: "'Mistress Prudence-is-to-Worship-and-be-Humbled-Before-Him!,' you enunciate clearly, hastily combing your fingers through your beard and sweeping your hat off your head.",
        nextText: 138,
        requiredState: (currentState) => currentState.wrongName,
      },
      {
        text: "You clear your throat hesitantly. 'Mistress...Poodle-Warship-and-Bumblebee-Forehead?' you say, trying not to sound as nervous as you feel.",
        nextText: 138,
        requiredState: (currentState) => !currentState.wrongName,
      },
    ],
  },
  {
    id: 153,
    text: "Today must be a lucky day - you know that your research is risky, skipping an assembly for an excursion even more so, and you're extremely glad you didn't get in any serious trouble this time. Having made a quick check of your satchel and numerous pockets, you make a bee-line for the Rose and Respite. Hopefully you won't have to answer any awkward questions from Moggy and Mortar about where you've been. It's the busiest time of day for taverns, so hopefully they'll be otherwise engaged.",
    options: [
      {
        text: "Take the back entrance and attempt to sneak past your siblings.",
        nextText: 185,
      },
    ],
  },
  {
    id: 154,
    text: "The proprietor of the Dragon's Return knows you fairly well from your numerous visits to the tavern, and starts pouring your customary pint of scrumpy as soon as you walk in. You take a table in a secluded corner, making yourself as inconspicuous as possible, and make some more notes in your sketchbook while you prepare to while away the hours. Unfortunately, the peace and quiet lasts barely half an hour before a shadow falls across your table.",
    options: [
      {
        text: "Oh gods above, what now? You raise your head with an exasperated sigh.",
        nextText: 155,
        requiredState: (currentState) => currentState.inTrouble,
      },
      {
        text: "Oh gods above, what now? You raise your head with an exasperated sigh.",
        nextText: 169,
        requiredState: (currentState) => !currentState.inTrouble,
      },
    ],
  },
  {
    id: 155,
    text: "Unfortunately, it's not one shadow, it's several - three Fingers (Order members, charged with keeping the peace in groups called Hands) in their unmistakable sky-blue uniforms are standing over you, looking more than a little menacing. One is a brown-haired human, one is a dwarf like yourself, and the other has a hint of the elven about them - though you'd bet they would never admit to that. You start to speak, but one of them cuts you off immediately, saying roughly, 'And what do you think you're doing here?'",
    options: [
      {
        text: "They've clearly had a couple of drinks already. You're not looking for trouble, so you'll just play along. 'I was just going, as it happens.'",
        nextText: 156,
      },
      {
        text: "You are so sick of the Order pushing you around! 'Having a drink,' you reply tensely. 'Is that illegal now?'",
        nextText: 157,
      },
    ],
  },
  {
    id: 156,
    text: "'Is that so?' the dwarf says, and with a pang of horror, you recognise her as Shale Feashog, one of your friends from childhood, though you're sure she will have now renounced her dwarven name in favour of a more Lucenic alias. She certainly doesn't seem to acknowledge your history as she says, 'You'd better. This is no place for your kind.' Before you can formulate a response, the three of them are chivvying you towards the door of the Dragon's Return - and to add insult to injury, one of them jeers, 'And take your scrumpy with you!' before pouring it over your head.",
    options: [
      {
        text: "Fight back tears, then leave the Dragon's Return and try to compose yourself before you head back to Tiparos.",
        nextText: 128,
      },
      {
        text: "Something inside you snaps. You won't be intimidated and bullied by anyone, let alone one of your own!",
        nextText: 157,
      },
    ],
  },
  {
    id: 157,
    text: "You stand and draw yourself up to your full height of four foot two, daring the Fingers to challenge you. They laugh unpleasantly in the otherwise silent pub. 'We know you skipped this morning's assembly,' the human jeers, 'You were seen leaving Tiparos by more than one witness, and Jophiel has given us special dispensation to...remind...truants such as yourself of the importance of attending the word of Lucene.' They're deliberately crowding you now, as if daring you to act first. The half-elf cracks their knuckles.",
    options: [
      {
        text: "You can't back down, but you're not going to swing first. Wait and see what they do next.",
        nextText: 158,
      },
      {
        text: "Your temper is at boiling point. Use the element of surprise and take a pop at the closest Finger, then get ready to fight or flee.",
        nextText: 161,
      },
    ],
  },
  {
    id: 158,
    text: "'We could, however, be persuaded to overlook your error on this occasion,' the half-elf says in a quieter voice, with a meaningful look at your satchel. 'If you have anything that might distract us, that is.' With great effort, you manage not to roll your eyes at the hypocrisy of these fools, and resign yourself to giving them something in return for their silence. ",
    options: [
      {
        text: "You open your bag and hold it out to the half-elf, who reaches for it with a smirk.",
        nextText: 159,
        requiredState: (currentState) => !currentState.noJawbreakers,
      },
      {
        text: "You open your bag and hold it out to the half-elf, who reaches for it with a smirk.",
        nextText: 160,
        requiredState: (currentState) => currentState.noJawbreakers,
      },
    ],
  },
  {
    id: 159,
    text: "Their hand disappears inside your bag of precious possessions and they take obvious joy in the look of mingled anger, fear and resentment on your face, deliberately rummaging right to the bottom before pulling out a drawstring bag stained with purple juices. 'What do we have here?' the dwarf-formerly-known-as-Shale says with a grin as the half-elf drops your satchel on the flagged floor and looks inside the purse. 'I know what those are!' the human crows. 'Amethyst Jawbreakers! Those are worth a fair few gold apiece!' The half-elf says, 'That so? Well, I think these are rather distracting. Move along now, and don't let us see you here again.'",
    options: [
      {
        text: "You're seething with the injustice of having the mushrooms you gathered - fair and square! - taken from you, but you know better than to argue.",
        nextText: 167,
        setState: { noJawbreakers: true },
      },
      {
        text: "There's no way you're letting these bastards get away with treating you like this! Throw a punch!",
        nextText: 161,
      },
    ],
  },
  {
    id: 160,
    text: "The half-elf's hand delves deep into your satchel, relishing the fact that you can do absolutely nothing to stop them. You grit your teeth to stop yourself saying something stupid as they pull out item after item, dropping them carelessly on the floor of the tavern, but when the dwarf heavily treads on a wooden brush your mother carved for you, your patience abruptly wears out. 'Do you mind?!' you snap, bending down to gather your possessions. 'Not at all,' the human says, and shoves you squarely in the chest.",
    options: [
      {
        text: "This has gone too far. Nobody puts their hands (or Fingers) on you and gets away with it - aim a jab at the human.",
        nextText: 161,
      },
      {
        text: "You've still got the knife - that would definitely scare these bastards off! Wave it at them and they're sure to scarper.",
        nextText: 171,
        requiredState: (currentState) => currentState.gotKnife,
      },
    ],
  },
  {
    id: 161,
    text: "You prefer not to get physical when you can help it, but you also refuse to be disrespected by bullying cowards with ideas above their stations. Your fist sails through the air and you grit your teeth in anticipation of the bones of your hand connecting with the bones of a face, but a mittened hand grabs your arm and stops your blow connecting. All three of the Fingers swing round to see who's grabbed you; the human lets out a shuddering gasp, but your rage is such that you try - and fail - to pull your arm away and keep fighting.",
    options: [
      {
        text: "Something sharp jabs your shoulder - has this unknown interloper got a knife?",
        nextText: 162,
      },
    ],
  },
  {
    id: 162,
    text: "The three Fingers back away hurriedly, the dwarf tripping backwards over your dropped satchel and sending a puff of dust up as she lands heavily on the floorboards. Turning your head slightly, you see a long, sharp sword prodding you - but hold on, that isn't like any sword you've ever seen. It's black and oddly matte, and...curved? The pointed pressure on your shoulder eases as the person behind you utters a muffled 'Get out!' and the Fingers don't hesitate to obey. The croaky voice says, 'Miracle? Sit down, please, and no more nonsense.'",
    options: [
      {
        text: "You don't really have a choice here - the Fingers have gone, so you take the chance to catch your breath.",
        nextText: 163,
      },
    ],
  },
  {
    id: 163,
    text: "'Miracle, what do you think you're doing? It's lucky I was here!' the...person? croaks, releasing you to slump into a chair. You look up into an embroidered hood, which does a fairly poor job at concealing the gigantic black beak which was (until very recently) poking you in the shoulder. Neat white feathers and horribly large black eyes complete the picture, and you can very much understand why the Fingers didn't want to stick around. This person is an Aarakocra - a female, if you're not mistaken - and she seems to know your name.",
    options: [
      {
        text: "You've never met an Aarakocra in real life! This is amazing! Settle down and talk to her.",
        nextText: 164,
      },
      {
        text: "You've been through a lot today, but a giant bird-person is one step too far. You'd rather take your chances with the Order - get up and leave.",
        nextText: 173,
      },
    ],
  },
  {
    id: 164,
    text: "You take a moment to think of something to say that won't sound rude, and settle on, 'Who are you?' The Aarokocra sighs and sits down opposite you, pulling her hood further over her face. 'My name is Egretta,' she says quietly, and you have to strain to catch her every word. 'I know your sister. Don't ask me how, I don't want to have to lie to you.' This is somewhat of a revelation - how on earth could your by-the-book sister Moggy know someone like this? 'She asked me to keep an eye on you today.' This gives you pause, because you certainly haven't seen Egretta anywhere; you're sure you would have noticed a five-foot bird following you around.",
    options: [
      {
        text: "Ask her what she means - how could she have been following you?",
        nextText: 165,
      },
    ],
  },
  {
    id: 165,
    text: "'But - but how? I would have seen you!' you blurt. Egretta can't smile, exactly, but her eyes definitely twinkle as she taps the side of her beak with her mitten. 'That's for me to know,' she says. 'Now listen - Tiparos isn't safe any more, Miracle. You can't just do whatever you want and expect to get away with it. We think the Order is watching you, and we need you to stay safe. Keep your head down.' Your eyes are drawn to a small silver badge in the shape of a bird, sitting neatly on an embroidered tree, as Egretta straightens her cape.",
    options: [
      {
        text: "You ask the first question that comes to mind: 'Who is 'we'?'",
        nextText: 166,
      },
    ],
  },
  {
    id: 166,
    text: "Egretta lets out a tuneful whistle and says, 'I've said too much already. Go home, Miracle, and please don't do anything stupid.' You've clearly been dismissed, because Egretta gets up and strides out of the door of the Dragon's Return without a backwards glance. You take a moment to collect your thoughts; who is Egretta, really? How does she know your sister? What did she mean by 'we'? This is a mystery you are determined to get to the bottom of, and for that you need to talk to Moggy. Following Egretta out of the door, you stop dead in your tracks - she's disappeared. She couldn't have been more than fifty paces ahead of you, but she is nowhere to be seen.",
    options: [
      {
        text: "This is getting more and more odd. Now you have more than one reason to hurry home.",
        nextText: 128,
        setState: { metEgretta: true },
      },
    ],
  },
  {
    id: 167,
    text: "You stare the Fingers down as they divest you of your hard-won mushrooms, committing their faces to memory, but they just laugh at your scowl. There aren't usually many people in the Dragon's Return at this time of day, and you notice the bartender studiously refusing to look up from the row of earthenware jugs they're cleaning, so you aren't counting on anyone coming to your aid. The three Order members start bickering about how best to turn a profit from your harvest as they stroll unconcernedly out of the door without sparing you a glance.",
    options: [
      {
        text: "Your belongings are scattered on the floor - gather them up and give the Fingers a chance to leave before you head off yourself.",
        nextText: 168,
      },
    ],
  },
  {
    id: 168,
    text: "Sitting at the wooden table, you're restoring all your bits and bobs to their proper places in your satchel - a couple of small things broken beyond repair, but fortunately nothing that can't be replaced - and muttering angrily to yourself when a shadow falls across your table. The Fingers surely can't be back - what could they possibly want from you now?",
    options: [
      {
        text: "'Sod. Off.' you say sharply, aiming a glare at this person.",
        nextText: 169,
      },
      {
        text: "Assess the situation before you say anything - you don't want to get in more trouble.",
        nextText: 169,
      },
    ],
  },
  {
    id: 169,
    text: "You barely suppress a gasp as your eyes meet those of the strangest being you've ever seen. The first thing you notice is a large, shining black beak protruding from the middle of their face. Five foot tall, wearing an embroidered green cape and pointed hood, their skin is - no, it can't be - snow-white feathers. They're wearing leather mittens, but their hands seem much longer and wider than they should be, and something scratches the floorboards as they take another step towards you. This person (an Aarakocra, you realise) certainly isn't smiling, but their round black eyes seem to twinkle as they appraise you.",
    options: [
      {
        text: "'Who- who are you?!' you blurt, all politeness forgotten.",
        nextText: 170,
      },
      {
        text: "Stay silent - you don't know what this person's intentions are.",
        nextText: 170,
      },
    ],
  },
  {
    id: 170,
    text: "There's a throaty chuckling sound, then the beak opens and a croaking, singsong voice says, 'My my, didn't your parents teach you any manners?' This makes you blush and you realise how rude you've been. 'Sorry,' you say quickly, 'I just-' The bird-person waves away your apology and says, dropping her voice to a cawing, staccato whisper, 'No harm done. I'm Egretta, and you're Miracle! Pleasure to meet you, at last! I know your sister. Don't ask me how, I don't want to have to lie to you.' This is somewhat of a revelation - how on earth could your by-the-book sister Moggy know someone like this? 'She asked me to keep an eye on you today.' This gives you pause, because you certainly haven't seen Egretta anywhere; you're sure you would have noticed a five-foot bird following you around.'",
    options: [
      {
        text: "Ask Egretta what she means - how could she have followed you without you noticing?",
        nextText: 165,
      },
    ],
  },
  {
    id: 171,
    text: "Quick as a flash, you whip out the knife and hold it out towards the Fingers. They stop dead, seemingly trying to figure out whether you're actually threatening them, and the face of the human twists into a mocking sneer before he says, 'Ooh, very scary. A little dwarf, out on her own, with a little knife. Do you think that's going to stop us?' You notice the dwarf purse her lips at his comment, but she doesn't say anything - though her eyes keep flicking down towards your blade.",
    options: [
      {
        text: "Well, you can't back down now! Feint a jab at the human's belly and show them you're not to be trifled with.",
        nextText: 172,
      },
      {
        text: "Maybe this is a bad idea after all. Sheathe the knife and swing for him instead.",
        nextText: 161,
      },
    ],
  },
  {
    id: 172,
    text: "Your arm darts out as you slash at the Finger, though you make sure to keep your knife well clear of actually hurting him. He leaps back and steps on the half-elf's foot, making them yell in pain; the dwarf seems to have had quite enough of all this, since she turns tail and flees out of the door of the Dragon's Return. The other two follow sharpish - you knew they were cowards! You can't help but feel a bit proud of yourself for seeing off three Order members at once; you can only hope this doesn't come back to haunt you.",
    options: [
      {
        text: "You're just collecting your possessions when someone else approaches you. You're probably in trouble now...straighten up and see what they want.",
        nextText: 169,
      },
    ],
  },
  {
    id: 173,
    text: "The Aarakocra is faster than she looks, and as soon as you try pulling away from her she grabs a beakful of your beard, making you shriek in shock and pain. She says, her voice muffled through the braids of your beard, 'Please, Miracle, wait a moment. This won't take long, I promise.'",
    options: [
      {
        text: "She's not giving you much of a choice - give her a chance to explain herself.",
        nextText: 164,
      },
    ],
  },
  {
    id: 174,
    text: "You mutter angrily under your breath as you divert your path to skirt the massive wall that encloses the city, cursing your past self and Philustra in equal measure. You've brought her the odd sample of the countryside's flora before, but she's never asked you to get something quite as rare as Smokecaps before - she's probably pushing to see how far she can take your little arrangement. Resolving to have words with her on your next visit, you scan the gigantic stone blocks for the characteristic blood-red gills of ripe Smokecap fungi.",
    options: [
      {
        text: "There's a scattering of rust-coloured fungus to your left which looks like it's within arm's reach - easy!",
        nextText: 175,
      },
      {
        text: "Hmm, there are some bright red specimens higher up, but you'll have to figure out a way to reach them.",
        nextText: 999,
      },
    ],
  },
  {
    id: 175,
    text: "Approaching the section of wall where these mushrooms are growing, you can see that at the end of their long, curving stems they have the mottled grey cap which allows for them to blend in with the stone they live on, but the gills aren't the bright red that's depicted in 'Fungi of the Far Realms' - more of a dirty, dark orange. They're growing so close to the ground that you can reach them just by standing on tiptoe.",
    options: [
      {
        text: "Grab a few - you're getting tired, and you'd quite like to get home. Philustra won't notice if they're a bit past their best.",
        nextText: 176,
      },
      {
        text: "Best to be absolutely certain where mushrooms are concerned - you'll try for the higher-up ones instead.",
        nextText: 177,
      },
    ],
  },
  {
    id: 176,
    text: "Holding one of your drawstring pouches ready, you pluck one from the surface of the stone. It immediately crumbles into large, powdery chunks which cover your fingertips in grey-brown dust and send puffs of spores spiralling through the air, making you cough. Your eyes suddenly burn like someone had splashed you with acid, which makes you clench them shut and you instinctively try to brush away whatever's burning you - a big mistake. You blink hard, again and again, but your vision is gone. Not black, or muddled, just...gone.",
    options: [
      {
        text: "Shout for help and hope that someone hears you as you stumble your way towards - you hope - the city gate, utterly blind.",
        nextText: 999,
      },
    ],
  },
  {
    id: 177,
    text: "Squinting up at the underside of the Smokecaps, you can see that these are indeed prime specimens, but far beyond the reach of a dwarf. Taking a few minutes to think, you hit upon the genius idea of tying a paperweight to a length of strong thread, then throwing it up and over the mushrooms, perpendicular to the wall, to try and sever the stalks (like cutting cheese with a wire). With any luck, you'll cut through them easily and they'll drop to the ground for you to collect.",
    options: [
      {
        text: "Try out your improvised mushroom-collecting method!",
        nextText: 178,
      },
      {
        text: "Nah, that's ridiculous. You've got a knife, you'll just chuck it up there and hope for the best.",
        nextText: 179,
        requiredState: (currentState) => currentState.gotKnife,
      },
    ],
  },
  {
    id: 178,
    text: "It takes you a couple of tries, but you manage to knock several mushrooms down without crushing them or hitting yourself in the face with the heavy paperweight. You're unreasonably proud of your invention - and looking forward to seeing Philustra's face when presented with her favourite contraband. This many Smokecaps is certainly a fair exchange for her silence.",
    options: [
      {
        text: "Carefully stow them in your satchel and start making your way back to the gate.",
        nextText: 128,
      },
    ],
  },
  {
    id: 179,
    text: "Throwing a razor-sharp knife ten feet over your head is, perhaps, not one of your brightest ideas. Your first try sees the knife scraping against the stone, scuffing its intricately carved handle; on the second, the knife slices no more than the corner of one fungus; for you, the third time is definitely not lucky. The sharp silver blade winks in the setting sun, then streaks towards the ground. You pause for the heart-stopping moment it takes you to figure out why the handle now appears to be growing out of your boot. ",
    options: [
      {
        text: "Shrieking in shock and pain, you fall to the ground clutching your foot. That's going to leave a nasty scar.",
        nextText: 999,
      },
    ],
  },
  {
    id: 180,
    text: "Your feet carry you instinctively towards Pryer's Paradise, the second-hand shop where you've spent many a happy afternoon browsing the seemingly unending piles, stacks and rows of odds and ends. The gnomish owner, Potato (not his real name, but you've never heard him called anything else) is barely visible behind the glass shopfront, which is painted with the shop's name and slogan - 'You want it? It's possible that we have it!' - though you can see he's talking to someone wearing a cowl pulled up over their head. He's frowning as he speaks to whichever customer is giving him a headache on this particular day.",
    options: [
      {
        text: "Open the door and step in! Potato's collection of trinkets is second to none.",
        nextText: 181,
      },
    ],
  },
  {
    id: 181,
    text: "Potato glances up as you enter and raises a tiny hand in greeting, then goes back to his conversation. The two of them are speaking in hushed tones, but you distinctly hear the word 'smuggle' before politely turning your attention to a stand of gaudy necklaces. You're inspecting a particularly ugly one which consists of walnut-sized clay cubes painted in shades of brown when you hear the door's bell ring as it opens and shuts quickly. 'Miracle!' Potato says cheerfully, 'Pleasure to see you, yes, a pleasure! What can I help you with today, hmm? Could I interest you in a book, perhaps, or a new charm for your beard? What about-'",
    options: [
      {
        text: "Potato has a tendency to get carried away, so you know he won't mind if you cut him off. Explain that you're just here to browse.",
        nextText: 182,
      },
      {
        text: "One of the reasons you like Potato is how much he encourages your curious nature - and how much he loves to talk. Ask him what that person wanted.",
        nextText: 183,
      },
    ],
  },
  {
    id: 182,
    text: "'Thank you, Potato, but actually I'm just having a look around today,' you smile over the end of his sentence. He doesn't stop talking but picks up with, 'Of course, of course, take your time, look around, and if you need anything I'll be here, yes, just say the word! I know all my stock inside and out and backwards and forwards and upside down! But you know that already, yes, you're my favourite customer! Do I say that to everyone? No! I-' He's not even really talking to you any more, and doesn't notice when you slip away to browse his goods. It seems like there's something new to see every time you visit.",
    options: [
      {
        text: "While away some time inspecting the various oddities and curiosities Pryer's Paradise has to offer, then head home.",
        nextText: 153,
      },
    ],
  },
  {
    id: 183,
    text: "'Potato, what business were you doing with the person who just left?' you ask. He's usually more than happy to be asked questions about the shop and his customers, so you're surprised when he abruptly stops mid-sentence and gazes down at his ledger. His gold-rimmed monocle glints in the light from the many candles around the shop as he looks back up at you and says, 'I'm not at liberty to discuss that, Miracle, not everything is up for discussion, it's nothing personal, you understand, but I do have a responsibility to keep my customers' secrets, yes, no matter what the Order says! It's a matter of pride, and-'",
    options: [
      {
        text: "Curious. That wasn't the answer you were expecting. 'So the Order has been poking around here?' you ask.",
        nextText: 184,
      },
    ],
  },
  {
    id: 184,
    text: "The golden monocle drops to Potato's chest as his eyes widen with realisation at what he's just told you. 'No! They certainly haven't, and why would they? I'm-' he hops down from the stack of books he's been standing on behind his desk, continuing, '-a scrupulous businessgnome! Nothing illegal here, no contraband, no black-market, nothing banned, forbidden or otherwise prohibited! Now if you don't mind, young madam, I have a lot to do!' Potato begins actually chivvying you towards the door, surprisingly strong for such a small person. 'Good day! Yes, good day, I say! Adieu, farewell and begone!'",
    options: [
      {
        text: "Whoops - you didn't mean to offend him. Better head back to the Rose & Respite and apologise another day.",
        nextText: 153,
      },
    ],
  },
  {
    id: 185,
    text: "The streets of Tiparos are usually abuzz on the evening after an assembly, and today is no exception. Threading your way carefully along the cobblestones, being careful to avoid the groups of people spilling out of the door of your family pub (a good sign: this crowd is sure to be keeping your siblings very busy indeed), you nip around to the back of the Rose and Respite and ease the heavy wooden door open. Phew - no sign of Moggy or Mortar.",
    options: [
      {
        text: "Slip quietly up the stairs and into your room. You're an expert at sneaking around, so you manage to avoid every creaking step.",
        nextText: 186,
        requiredState: (currentState) => currentState.inTrouble,
      },
      {
        text: "Slip quietly up the stairs and into your room. You're an expert at sneaking around, so you manage to avoid every creaking step.",
        nextText: 190,
        requiredState: (currentState) => !currentState.inTrouble,
      },
    ],
  },
  {
    id: 186,
    text: "Ever so quietly, you lift your bedroom's latch, open the door, slip inside and close it in one swift motion. Breathing a sigh of relief, you begin to hang up your hat and unload your satchel, but you let out an involuntary squeak of dismay as you catch sight of your brother sitting casually on your bed. He glares at you with undisguised venom and spits, 'So, finally back, are you?' His eyes are narrowed and he cracks his knuckles one at a time as he waits for you to answer.",
    options: [
      {
        text: "There's nothing for it - he must know about your little escapade by now. 'Evidently,' you say sarcastically.",
        nextText: 187,
      },
      {
        text: "Try and bluff. He's never been quite as astute as Moggy, so you have a slim chance of talking him round. 'Back from where?'",
        nextText: 187,
      },
    ],
  },
  {
    id: 187,
    text: "'Oh, stop it, Miracle,' Mortar snaps. 'I know where you've been, and I know what you've been doing.' He picks up a book from beside him and holds it up so you can see that it's the last notebook you were using before your current one. There are all sorts of incriminating notes and experiments in there, and if he's read all of it, he knows exactly what you've been up to lately. 'Oh yeah?' you reply harshly. 'Worked it out at last, have you? Well done, Mortar, very well done. What are you going to do about it? Turn me in?' Your heart is beating fast now and you can tell that your face is red with anger, tinged with fear. He read your diary!",
    options: [
      {
        text: "You don't like the look on your brother's face at all, but you can't back down now.",
        nextText: 188,
      },
    ],
  },
  {
    id: 188,
    text: "Mortar's face unexpectedly drops, and he looks...sad, and disappointed. 'I don't want to report you, Miracle,' he says more quietly, 'but you can't carry on like this. You know what you're doing is illegal, and if the Order finds out, you'll be arrested. I don't want to see that happen to you.' You don't quite know what to say to that, so you keep quiet until he says, mostly to himself, 'Mum and Dad wouldn't have wanted this,'",
    options: [
      {
        text: "'Well, Mum and Dad are dead! We don't know what they would have wanted!' you shout, tears pricking your eyes.",
        nextText: 189,
      },
    ],
  },
  {
    id: 189,
    text: "'Moggy and I have done our best, can't you see that? I miss them too, but you can't just do whatever you want. I don't want to lose you as well,' your brother says, and for a moment you think he's going to let the subject drop. He shakes his head and takes a deep breath. 'This is for your own good, Miracle. We must obey Lucene, and Lucene's word is that magic and all arcane arts are forbidden. Look what happened to Lytheran. He killed...so many people. He killed Mum and Dad because his magic overpowered his soul.' Mortar gets up from the bed and starts towards you.",
    options: [
      {
        text: "Run - run now! You don't know where you're going to go, but you have to get out of here.",
        nextText: 202,
      },
    ],
  },
  {
    id: 190,
    text: "Ever so quietly, you lift your bedroom's latch, open the door, slip inside and close it in one swift motion. Breathing a sigh of relief, you begin to hang up your hat and unload your satchel, but you let out an involuntary squeak of dismay as you catch sight of your sister leafing casually through your copy of 'Moonshadow's Observations'. She turns with affected casualness, looking you up and down as she slots the book back on your shelf. 'Hello, Miracle,' she says easily. 'Care to tell me where you've been?'",
    options: [
      {
        text: "In a fraction of a second, your mind whizzes through possible answers and settles on a half-truth. 'Just visiting Potato,'",
        nextText: 191,
      },
      {
        text: "There's no way she would be in your room waiting for you during a post-assembly rush unless she already knew. 'I went to the temple.'",
        nextText: 196,
        requiredState: (currentState) =>
          currentState.metEgretta || currentState.metSandalpha,
      },
      {
        text: "There's no way she would be in your room waiting for you during a post-assembly rush unless she already knew. 'I went to the temple.'",
        nextText: 200,
        requiredState: (currentState) =>
          !currentState.metEgretta && !currentState.metSandalpha,
      },
    ],
  },
  {
    id: 191,
    text: "'Is that so?' she says calmly, in a tone that warns you to be extremely careful. 'And how long were you there for?' You involuntarily glance at the clock on your wall, uncomfortably aware that many hours have passed since you first left Tiparos this morning. 'Oh, you know how I can get,' you breeze. 'He's got so many interesting books, I lost track of time.' You start taking off your hat and boots, hoping she won't question you further. 'Curious,' Moggy replies, clearly waiting for you to ask what exactly is curious.",
    options: [
      {
        text: "You'll take the bait. 'What's curious?'",
        nextText: 192,
      },
      {
        text: "Nope, you're not going to rise to that. Just shrug and go about your business.",
        nextText: 193,
      },
    ],
  },
  {
    id: 192,
    text: "'I just wasn't aware that Potato kept any mycological specimens,' Moggy says, pointedly looking at the floor. You follow her gaze and realise that your satchel has sagged open, revealing some very incriminating fungi, which you know that Moggy knows you couldn't have found anywhere but the temple of Sylvanus. The game is up. 'Alright, fine. I did go to the temple,' you say, trying not to sound sulky, and Moggy hisses, 'I knew it! Miracle, you really shouldn't have gone there. You're going to get caught. Please, you have to stop this.'",
    options: [
      {
        text: "'Bit rich coming from you, isn't it?' you blurt before you can stop yourself.",
        nextText: 194,
      },
    ],
  },
  {
    id: 193,
    text: "A very awkward minute or so follows, as both you and Moggy refuse to break the silence in the room. You pointedly tidy your desk and straighten the bookshelf (conveniently shoving your satchel into a cupboard as you do so) until she finally hisses, 'Oh come on, Miracle! I know you went to the temple today! You can't keep doing this - please, you have to stop going there. I'm worried the Order is going to catch you. I can't handle that. Please don't ask me to let you risk yourself like that.' You turn to look at her, surprised to see her eyes full of tears.",
    options: [
      {
        text: "'So I can't risk myself, but you can risk yourself? Is that what you're saying?' you snap.",
        nextText: 194,
      },
    ],
  },
  {
    id: 194,
    text: "'What? What do you-' Her eyes go wide. 'Oh, please. I'm not stupid, Moggy. I know you're a druid. How else do we always have fresh flowers on every table, even in winter? Why do our vegetables never, ever go mouldy? Why don't we need a cat, when every single other tavern is full of mice without one?' you say, trying not to raise your voice. Moggy clenches her teeth and closes her eyes in defeat, then says, 'Fine, you worked it out. I'm a druid, just like Mum. Are you happy now?'",
    options: [
      {
        text: "'Not particularly. You're such a hypocrite, do you know that?' you say bitterly.",
        nextText: 195,
      },
    ],
  },
  {
    id: 195,
    text: "'Yes, I know, and I'm sorry. I thought it was better that I didn't tell you because I didn't want you to think it was alright to do magic, and that nothing bad would happen if you did. Mortar doesn't know, either, so please don't tell him,' Moggy says, her head in her hands. You scoff and say, 'He's an idiot if he hasn't worked it out for himself.' She tries not to laugh, and you feel a sudden rush of love for your sister. 'Can we talk about this later?' Moggy says tiredly. 'We really need to have a proper conversation, and I need to show you how to hide yourself better.'",
    options: [
      {
        text: "You hug your sister tightly and let her out of your room to rejoin Mortar at the bar.",
        nextText: 201,
      },
    ],
  },
  {
    id: 196,
    text: "'I know,' says Moggy, a hint of smugness around the set of her mouth. 'How do you know?' you say immediately. She looks at you appraisingly for a moment, then says, 'I have a couple of friends looking out for you.' It all falls into place. The person you met earlier must have been one of Moggy's so-called friends. 'But how do you know her?' you demand. Moggy just shakes her head, and ",
    options: [
      {
        text: "You snap, 'I know you're a druid! Tell me how you know Egretta!'",
        nextText: 197,
        requiredState: (currentState) =>
          currentState.metEgretta && !currentState.metSandalpha,
      },
      {
        text: "You snap, 'I know you're a druid! Tell me how you know where I was!'",
        nextText: 198,
        requiredState: (currentState) =>
          !currentState.metEgretta && currentState.metSandalpha,
      },
      {
        text: "You snap, 'I know you're a druid! Tell me how you know where I was!'",
        nextText: 199,
        requiredState: (currentState) =>
          currentState.metEgretta && currentState.metSandalpha,
      },
    ],
  },
  {
    id: 197,
    text: "'What? What do you-' Her eyes go wide. 'Oh, please. I'm not stupid, Moggy. I know you're a druid. How else do we always have fresh flowers on every table, even in winter? Why do our vegetables never, ever go mouldy? Why don't we need a cat, when every single other tavern is full of mice without one?' you say, trying not to raise your voice. Moggy clenches her teeth and closes her eyes in defeat, then says, 'Fine, you worked it out. I'm a druid, just like Mum. Egretta was a friend of Mum's before she died. Are you happy now?'",
    options: [
      {
        text: "'Not particularly. You're such a hypocrite, do you know that?' you say bitterly.",
        nextText: 195,
      },
    ],
  },
  {
    id: 198,
    text: "'What? What do you-' Her eyes go wide. 'Oh, please. I'm not stupid, Moggy. I know you're a druid. How else do we always have fresh flowers on every table, even in winter? Why do our vegetables never, ever go mouldy? Why don't we need a cat, when every single other tavern is full of mice without one?' you say, trying not to raise your voice. Moggy clenches her teeth and closes her eyes in defeat, then says, 'Fine, you worked it out. I'm a druid, just like Mum. Sometimes I get messages - someone in the Order is looking out for you, but I have no idea who it is. Are you happy now?'",
    options: [
      {
        text: "'Not particularly. You're such a hypocrite, do you know that?' you say bitterly.",
        nextText: 195,
      },
    ],
  },
  {
    id: 199,
    text: "'What? What do you-' Her eyes go wide. 'Oh, please. I'm not stupid, Moggy. I know you're a druid. How else do we always have fresh flowers on every table, even in winter? Why do our vegetables never, ever go mouldy? Why don't we need a cat, when every single other tavern is full of mice without one?' you say, trying not to raise your voice. Moggy clenches her teeth and closes her eyes in defeat, then says, 'Fine, you worked it out. I'm a druid, just like Mum. A couple of her old circle-mates are looking out for you, and they contact me if they think there's something I need to know. Are you happy now?'",
    options: [
      {
        text: "'Not particularly. You're such a hypocrite, do you know that?' you say bitterly.",
        nextText: 195,
      },
    ],
  },
  {
    id: 200,
    text: "'I bloody knew it,' she hisses. 'You can't keep doing this - please, you have to stop going there. I'm worried the Order is going to catch you. I can't handle that. Please don't ask me to let you risk yourself like that.' You turn to look at her, surprised to see her eyes full of tears. 'I can't lose you as well.'",
    options: [
      {
        text: "'So I can't risk myself, but you can risk yourself? Is that what you're saying?' you snap.",
        nextText: 194,
      },
    ],
  },
  {
    id: 201,
    text: "Just before Miracle leaves, she says, 'Don't forget, you're meant to be cleaning the Magificence place this evening! Better not be late, eh?' You'd totally forgotten - the Bow-Down-Before-Lucene's-Magnificence family (the Magnificences, for short) don't live far from here, but you should get a move on all the same. The three of you need all the gold you can get; just owning a successful tavern isn't enough, since the Order tax you far beyond what's fair.",
    options: [
      {
        text: "Grab your hat and put your boots back on, then hurry to the manor.",
        nextText: 203,
      },
    ],
  },
  {
    id: 202,
    text: "As you hurtle out of the door, you catch Moggy's shout of 'Miracle, where are you going? You're meant to be cleaning the Magificence place this evening!' Oh, thank goodness - that's perfect! You'd totally forgotten - the Bow-Down-Before-Lucene's-Magnificence family (the Magnificences, for short) don't live far from here, and they're never at home when you go to polish their silverware and shake the dust from their many rugs. You can hide out there for a few hours while Mortar calms down.",
    options: [
      {
        text: "Slow your pace to a trot so as not to draw more attention to yourself.",
        nextText: 203,
      },
    ],
  },
  {
    id: 203,
    text: "You turn onto a wide street paved with shining cream-coloured stone (unlike the rough grey cobbles that make up the road outside the Rose and Respite), lined with opulent homes with rooves of real slate. Each one has a freshly painted front door, and some even have enough spare land on their property to grow ornamental shrubs (rather than using every available space to grow something edible). This is one of the areas of Tiparos where the prominent (and wealthy) Order members live, and it shows.",
    options: [
      {
        text: "Approach the Magnificence place, fish out their doorkey from underneath the sundial, and go inside.",
        nextText: 204,
      },
    ],
  },
  {
    id: 204,
    text: "As always, the manor is dead silent, but you still listen hard for a moment just in case somebody is at home. They've left your pay in an envelope on the dresser, so you scoop it up and tuck it into an inside pocket of your cloak. Your fingers brush something small and round inside your pocket - a pea? A marble? - and you pull it out to see what it is. This is...this is one of the little puffballs you came across in the temple.",
    options: [
      {
        text: "Put it back - you'll take it out at home.",
        nextText: 205,
      },
      {
        text: "Have a closer look at the fungus before you start cleaning.",
        nextText: 205,
      },
    ],
  },
  {
    id: 205,
    text: "The pearly surface of the orb is oddly compelling, and you find that you can't exactly figure out how to put it back in your pocket. It's as if the little fungus doesn't...want...to be in your pocket. But that can't be right - how can a fungus want anything? Before you can stop yourself, you find your feet taking you into the manor's drawing room, rolling the puffball gently between your fingers; somehow you're standing before one of the suits of armour, your outstretched fingertips covered in shimmering spores.",
    options: [
      {
        text: "The fungus is controlling you somehow. This is unlike anything you've ever read about. You don't particularly want to touch the cold metal, but you can't stop yourself reaching for it.",
        nextText: 206,
      },
    ],
  },
  {
    id: 206,
    text: "As if from a great distance, you watch yourself smear a little of the powdery spores onto the suit of armour, then the one next to it, one of the mounted swords and even the rug. You feel as if you're floating inside your own mind, totally unable to comprehend why you're doing what you're doing, or how to stop yourself behaving so oddly. This isn't fascinating any more, it's frightening. Just at the moment you begin to panic, a deafening creak of metal on metal shocks you out of your trancelike state.",
    options: [
      {
        text: "Suddenly in control of your body again, you jump almost out of your skin as the helmet of the first suit of armour you touched turns towards you.",
        nextText: 207,
      },
    ],
  },
  {
    id: 207,
    text: "You drop the puffball fungus onto the carpet, not caring if it gets crushed under your feet - the second suit of armour is moving its leg stiffly, as if trying to step off its plinth. This is far beyond anything you've ever seen in your mycological experiments. How could spores make something inanimate move like that? You don't have time to ponder how this could have happened, and duck just in time as the sword sails through the air, somehow flying straight towards where your head was a moment earlier.",
    options: [
      {
        text: "Get out of the house - now!",
        nextText: 208,
      },
    ],
  },
  {
    id: 208,
    text: "In your panic and desperation to get away from the manor, you forget to lock the door - but that's the furthest thing from your mind right now. You need help! This is a big city, and there must be adventrers around who are used to dealing with possessed household objects. Running as fast as you can, you turn a corner onto the street where the Sickle Moon is located. Taverns always have freshly minted heroes looking for something to do, and as luck would have it, a group of likely-looking individuals have just spilled onto the pavement.",
    options: [
      {
        text: "'Help! There's- I don't know what happened - the armour is alive! Please, you have to help!' you cry, pointing towards the house. They look at you, eyes bright, and start towards the Magnificence manor.",
        nextText: 998,
      },
    ],
  },
  {
    id: 998,
    text: "Congratulations! You've successfully navigated the perils of Tiparos and its surrounding countryside and followed Miracle's Mycology Mishap right to the end. Would you like to restart, and see what else there is to find?",
    options: [
      {
        text: "Yes - start again!",
        nextText: -1,
      },
      {
        text: "No - see credits.",
        nextText: 1000,
      },
    ],
  },
  {
    id: 999,
    text: "Game over!",
    options: [
      {
        text: "Start again!",
        nextText: -1,
      },
      {
        text: "See credits.",
        nextText: 1000,
      },
    ],
  },
  {
    id: 1000,
    text: "Thank you for playing my text adventure! It's based on my original D&D campaign which I've been running since May 2020, and follows a certain dwarven troublemaker who pops up throughout the story. The 'true ending' of this game sees you reach the point at which the players first encounter Miracle at the beginning of the campaign. Thanks also to Borc, Trims, Thicc, Brynn, Pym and Rivers, for playing along.",
  },
];

startGame();
