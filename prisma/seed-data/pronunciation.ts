export type PronunciationDrillSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    symbol: string;
    kind: "consonant" | "vowel";
    exampleWord: string;
    /** How the sound is physically made — mouth, tongue, voicing. */
    howTo: string;
    /** The substitution learners most often make, and why it costs marks. */
    commonError: string;
    words: string[];
    /** Pairs that differ only in this sound, so the contrast is audible. */
    minimalPairs: { target: string; contrast: string }[];
    /** A sentence loaded with the sound, for connected-speech practice. */
    sentence: string;
    tip: string;
  };
};

const CONSONANT_TAGS = ["pronunciation", "speaking", "consonant-sounds"];
const VOWEL_TAGS = ["pronunciation", "speaking", "vowel-sounds"];

export const PRONUNCIATION_DRILLS: PronunciationDrillSeed[] = [
  {
    slug: "th-voiceless",
    title: "The /θ/ sound — as in “think”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "θ",
      kind: "consonant",
      exampleWord: "think",
      howTo:
        "Put the very tip of your tongue lightly between your front teeth and push air out over it. Your vocal cords stay switched off — put a finger on your throat and you should feel no buzz. The tongue barely touches; if it presses hard you will get a /t/ instead.",
      commonError:
        "Most learners replace /θ/ with /t/, /s/ or /f/, so “think” becomes “tink”, “sink” or “fink”. Examiners rarely mishear a single word, but a consistent substitution across a whole Speaking test is exactly the kind of pattern that keeps Pronunciation at band 6 rather than 7+.",
      words: ["think", "three", "thirty", "bath", "month", "nothing"],
      minimalPairs: [
        { target: "think", contrast: "sink" },
        { target: "thin", contrast: "tin" },
        { target: "three", contrast: "tree" },
        { target: "mouth", contrast: "mouse" },
      ],
      sentence: "I think the thirty-third birthday is worth something.",
      tip:
        "Practise in front of a mirror. If you cannot see the tip of your tongue, you are not making /θ/ yet — exaggerate it at first, then let it shrink once the muscle memory is there.",
    },
  },
  {
    slug: "th-voiced",
    title: "The /ð/ sound — as in “this”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "ð",
      kind: "consonant",
      exampleWord: "this",
      howTo:
        "Exactly the same tongue position as /θ/ — tip between the teeth — but now switch your voice on so the sound buzzes. Say a long /θ/, then add your voice without moving your tongue: that is /ð/.",
      commonError:
        "Being replaced with /d/ or /z/: “this” becomes “dis” or “zis”. It matters more than it looks, because /ð/ appears in the most frequent words in English — the, this, that, they, there, then — so one wrong habit shows up in almost every sentence you say.",
      words: ["this", "that", "they", "mother", "weather", "breathe"],
      minimalPairs: [
        { target: "they", contrast: "day" },
        { target: "then", contrast: "den" },
        { target: "breathe", contrast: "breeze" },
        { target: "other", contrast: "udder" },
      ],
      sentence: "They would rather gather with their mother than with the others.",
      tip:
        "In fast natural speech /ð/ is very short and light — do not over-pronounce “the”. Aim for a quick buzz, not a held sound; that lightness is part of what makes speech sound fluent.",
    },
  },
  {
    slug: "sh",
    title: "The /ʃ/ sound — as in “she”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "ʃ",
      kind: "consonant",
      exampleWord: "she",
      howTo:
        "Pull the body of your tongue back and up towards the roof of your mouth, round your lips slightly, and push air through the narrow gap. It is the “be quiet” sound. No voicing — just air.",
      commonError:
        "Confusing it with /s/ (“she” → “see”) or with /tʃ/ (“shop” → “chop”). The difference from /s/ is tongue position and lip rounding; the difference from /tʃ/ is that /ʃ/ has no stop at the start — the air flows continuously.",
      words: ["she", "ship", "should", "wash", "station", "pressure"],
      minimalPairs: [
        { target: "she", contrast: "see" },
        { target: "ship", contrast: "sip" },
        { target: "shop", contrast: "chop" },
        { target: "wash", contrast: "watch" },
      ],
      sentence: "She should finish washing the dishes at the station.",
      tip:
        "Watch your lips, not just your tongue. English /ʃ/ has noticeable lip rounding — if your lips stay flat you will drift towards /s/ even when the tongue is right.",
    },
  },
  {
    slug: "zh",
    title: "The /ʒ/ sound — as in “vision”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "ʒ",
      kind: "consonant",
      exampleWord: "vision",
      howTo:
        "The voiced partner of /ʃ/: same tongue and lip position, but with your voice switched on. Say a long “shhh”, then turn your voice on without moving anything else.",
      commonError:
        "Hardening it into /dʒ/ — “vision” said as “vidgeon”, or “measure” as “medger”. /ʒ/ is rarer than the other sounds here and almost never starts an English word, so it is easy to miss in practice; it turns up mostly inside words ending -sion, -sual and -sure.",
      words: ["vision", "measure", "usual", "decision", "pleasure", "television"],
      minimalPairs: [
        { target: "measure", contrast: "major" },
        { target: "vision", contrast: "pigeon" },
        { target: "leisure", contrast: "ledger" },
      ],
      sentence: "The usual decision gives me great pleasure and no confusion.",
      tip:
        "This sound is worth deliberate practice because the words that carry it — decision, measure, conclusion, occasion — are exactly the kind of higher-level vocabulary you want in Part 3 answers.",
    },
  },
  {
    slug: "ch",
    title: "The /tʃ/ sound — as in “chair”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "tʃ",
      kind: "consonant",
      exampleWord: "chair",
      howTo:
        "Two sounds glued into one: begin with your tongue stopping the air as for /t/, then release it into /ʃ/. Stop, then let it burst out as a “shhh”. There is no voicing.",
      commonError:
        "Losing the stop and producing plain /ʃ/ — “chair” becoming “share”, “cheap” becoming “sheep”. Speakers of languages without this affricate often smooth it out, which makes a surprising number of everyday words ambiguous.",
      words: ["chair", "cheap", "children", "teacher", "watch", "future"],
      minimalPairs: [
        { target: "chair", contrast: "share" },
        { target: "cheap", contrast: "sheep" },
        { target: "watch", contrast: "wash" },
        { target: "chin", contrast: "shin" },
      ],
      sentence: "The teacher chose a cheaper chair for the children last Tuesday.",
      tip:
        "Feel for the tiny silence before the burst. If you can say the sound while holding your breath for a fraction of a second first, you have got the stop right.",
    },
  },
  {
    slug: "j-jump",
    title: "The /dʒ/ sound — as in “jump”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "dʒ",
      kind: "consonant",
      exampleWord: "jump",
      howTo:
        "The voiced partner of /tʃ/: stop the air as for /d/, then release into /ʒ/, with your voice on throughout. It is the sound at both ends of “judge”.",
      commonError:
        "Two habits cost marks here — replacing it with /j/ (the “yes” sound), so “jet” becomes “yet”, or with /z/, so “jelly” becomes “zelly”. Note that the letter “j” is pronounced /dʒ/ in English but /j/ or /x/ in many other languages, which is where the interference comes from.",
      words: ["jump", "just", "job", "bridge", "large", "generally"],
      minimalPairs: [
        { target: "jet", contrast: "yet" },
        { target: "jam", contrast: "yam" },
        { target: "juice", contrast: "goose" },
        { target: "badge", contrast: "batch" },
      ],
      sentence: "Generally, a large job just needs a manager with judgement.",
      tip:
        "Contrast it directly with /tʃ/ using pairs like “badge / batch” and “age / aitch”. Learning the voiced and voiceless versions together fixes both faster than drilling either one alone.",
    },
  },
  {
    slug: "r-sound",
    title: "The /r/ sound — as in “red”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "r",
      kind: "consonant",
      exampleWord: "red",
      howTo:
        "Curl the tip of your tongue up and back slightly, but do not let it touch anywhere in your mouth. Round your lips a little. English /r/ is a smooth glide — nothing taps, nothing rolls, nothing vibrates.",
      commonError:
        "Rolling or tapping it, as in Spanish, Italian, Hindi or Japanese, or replacing it with /l/. Also worth knowing: in standard British English, /r/ is only pronounced before a vowel — “car”, “hard” and “first” have no /r/ sound at all, though “car engine” does, because a vowel follows.",
      words: ["red", "around", "very", "problem", "bright", "correct"],
      minimalPairs: [
        { target: "red", contrast: "led" },
        { target: "right", contrast: "light" },
        { target: "correct", contrast: "collect" },
        { target: "pray", contrast: "play" },
      ],
      sentence: "The correct answer to a very rare problem is rarely obvious.",
      tip:
        "If your tongue keeps tapping, start from the vowel in “bird” /ɜː/ and slide straight into the word — “(er)red”. That entry point makes the glide almost automatic.",
    },
  },
  {
    slug: "l-sound",
    title: "The /l/ sound — as in “light”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "l",
      kind: "consonant",
      exampleWord: "light",
      howTo:
        "Touch the tip of your tongue firmly to the ridge just behind your top teeth and let the voiced sound escape around the sides. English has two versions: a “clear” /l/ before vowels (light, hello) and a “dark” /l/ at the end of words (feel, still), where the back of the tongue also rises.",
      commonError:
        "Two opposite problems. Some learners swap /l/ and /r/; others drop the final dark /l/ altogether so “feel” becomes “fee” and “milk” becomes “miuk”. Dropped final /l/ is very common and quietly reduces clarity across a whole answer.",
      words: ["light", "hello", "believe", "feel", "little", "still"],
      minimalPairs: [
        { target: "light", contrast: "right" },
        { target: "long", contrast: "wrong" },
        { target: "glass", contrast: "grass" },
        { target: "feel", contrast: "fear" },
      ],
      sentence: "I still believe a little light will help us all feel well.",
      tip:
        "Test your final /l/ with “little” — it contains both versions. Clear /l/ at the start, dark /l/ at the end. If both feel identical in your mouth, work on the ending.",
    },
  },
  {
    slug: "v-sound",
    title: "The /v/ sound — as in “van”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "v",
      kind: "consonant",
      exampleWord: "van",
      howTo:
        "Rest your top teeth lightly on your bottom lip and push voiced air through, so the lip buzzes. It is /f/ with the voice switched on — the contact is gentle, not a bite.",
      commonError:
        "Substituting /w/ (“van” → “wan”) or /b/ (“very” → “bery”). The giveaway is contact: /w/ and /b/ use both lips and no teeth, /v/ always uses teeth on lip. Learners whose first language has no /v/–/w/ contrast usually need to fix this consciously rather than by ear.",
      words: ["van", "very", "love", "seven", "improve", "available"],
      minimalPairs: [
        { target: "van", contrast: "ban" },
        { target: "vest", contrast: "west" },
        { target: "very", contrast: "berry" },
        { target: "leave", contrast: "leaf" },
      ],
      sentence: "Seven visitors have improved the value of every service available.",
      tip:
        "Hold the buzz. Say “vvvvv” for three full seconds before adding the vowel — a sustained /v/ is impossible to produce with /b/ or /w/, so it forces the correct position.",
    },
  },
  {
    slug: "w-sound",
    title: "The /w/ sound — as in “wet”",
    topic: "Pronunciation",
    tags: CONSONANT_TAGS,
    data: {
      symbol: "w",
      kind: "consonant",
      exampleWord: "wet",
      howTo:
        "Round your lips tightly, as if starting to whistle, raise the back of your tongue, then glide immediately into the next vowel. No teeth are involved at any point.",
      commonError:
        "Turning it into /v/ — “wine” said as “vine” — which is the mirror image of the /v/ problem. Also common: dropping it inside clusters, so “quite” loses the /w/ in “qu-” and comes out as “kite”.",
      words: ["wet", "away", "quick", "one", "would", "question"],
      minimalPairs: [
        { target: "wet", contrast: "vet" },
        { target: "wine", contrast: "vine" },
        { target: "west", contrast: "vest" },
        { target: "quick", contrast: "kick" },
      ],
      sentence: "We would quickly answer one question about the wet weather.",
      tip:
        "Start every /w/ word with an exaggerated kiss shape. Because /v/ needs teeth and /w/ needs rounded lips, making the lip shape first mechanically blocks the wrong sound.",
    },
  },
  {
    slug: "ae",
    title: "The /æ/ vowel — as in “cat”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "æ",
      kind: "vowel",
      exampleWord: "cat",
      howTo:
        "Open your mouth wide and push your tongue forward and low, with lips spread. It is noticeably more open than /e/ in “bed” — think of the shape you make at the dentist, but with the tongue pushed forward.",
      commonError:
        "Raising it to /e/, so “bad” sounds like “bed” and “man” like “men”. Many languages have one vowel where English has two, so the pair genuinely has to be learned rather than guessed.",
      words: ["cat", "hand", "apple", "family", "language", "understand"],
      minimalPairs: [
        { target: "bad", contrast: "bed" },
        { target: "man", contrast: "men" },
        { target: "sat", contrast: "set" },
        { target: "cat", contrast: "cut" },
      ],
      sentence: "My family had to understand that the black cat sat and sang.",
      tip:
        "This vowel is longer than most learners expect before voiced consonants — “bad” and “hand” carry real length. Cutting it short is a second, subtler way the word drifts towards “bed”.",
    },
  },
  {
    slug: "short-i",
    title: "The /ɪ/ vowel — as in “sit”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "ɪ",
      kind: "vowel",
      exampleWord: "sit",
      howTo:
        "A short, relaxed vowel made with the tongue high but loose, and the lips slightly spread. The key word is relaxed — the jaw stays low and the muscles stay soft, unlike the tense /iː/ in “see”.",
      commonError:
        "Replacing it with /iː/, so “ship” becomes “sheep” and “live” becomes “leave”. The real difference is tension and quality, not just length — lengthening a tense /iː/ is not the same as producing a relaxed /ɪ/.",
      words: ["sit", "big", "fish", "listen", "different", "minute"],
      minimalPairs: [
        { target: "ship", contrast: "sheep" },
        { target: "sit", contrast: "seat" },
        { target: "live", contrast: "leave" },
        { target: "fill", contrast: "feel" },
      ],
      sentence: "It is a bit difficult to fill six little dishes in a minute.",
      tip:
        "/ɪ/ is the most frequent vowel in English after the schwa. It hides in unstressed endings like -ed, -es and -ing, so getting it relaxed improves your rhythm as much as your individual words.",
    },
  },
  {
    slug: "long-e",
    title: "The /iː/ vowel — as in “see”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "iː",
      kind: "vowel",
      exampleWord: "see",
      howTo:
        "Push your tongue high and far forward, spread your lips into a smile, and hold the sound with tense muscles. It is the longest and tightest of the front vowels.",
      commonError:
        "Producing it too short, so it collapses into /ɪ/ and “leave” becomes “live”. Note that the length varies with what follows: /iː/ in “seat” is genuinely shorter than in “seed”, because voiceless consonants clip the vowel before them.",
      words: ["see", "sheep", "feel", "people", "believe", "receive"],
      minimalPairs: [
        { target: "sheep", contrast: "ship" },
        { target: "seat", contrast: "sit" },
        { target: "leave", contrast: "live" },
        { target: "feel", contrast: "fill" },
      ],
      sentence: "These three people believe he needs to leave this evening.",
      tip:
        "Drill it as a pair with /ɪ/, never alone. Saying “ship–sheep–ship–sheep” trains the contrast your ear actually has to make; saying “sheep” twenty times does not.",
    },
  },
  {
    slug: "schwa",
    title: "The /ə/ vowel — as in “about”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "ə",
      kind: "vowel",
      exampleWord: "about",
      howTo:
        "Completely relax your mouth, tongue and lips, and make a short voiced sound without shaping anything. That neutral, almost lazy sound is the schwa — the most common vowel in English.",
      commonError:
        "Pronouncing unstressed vowels the way they are spelled: saying “contain” with a full /ɒ/ instead of /kənˈteɪn/, or “to” as /tuː/ every time. Full vowels in unstressed syllables are the single biggest reason otherwise accurate speech sounds unnatural and effortful.",
      words: ["about", "banana", "sofa", "computer", "problem", "support"],
      minimalPairs: [
        { target: "support", contrast: "sport" },
        { target: "police", contrast: "please" },
        { target: "official", contrast: "a fish" },
      ],
      sentence: "The teacher asked about a computer problem at the machine.",
      tip:
        "The schwa is a Fluency tool as much as a Pronunciation one. Weakening the small words — a, of, to, for, was, that — is what creates English's stress-timed rhythm and stops each sentence sounding like a list of separate words.",
    },
  },
  {
    slug: "ur",
    title: "The /ɜː/ vowel — as in “bird”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "ɜː",
      kind: "vowel",
      exampleWord: "bird",
      howTo:
        "A long, central vowel: tongue in the middle of your mouth, lips neutral, held for a full beat. It is essentially a stressed, lengthened schwa. In standard British English there is no /r/ sound in it at all, despite the spelling.",
      commonError:
        "Adding an audible /r/ (“bird” → “bir-rd”), or rounding the lips so it slides towards /ɔː/ and “work” starts to sound like “walk”. Notice how many spellings share this one sound: -ir, -ur, -er, -ear, and -or after w.",
      words: ["bird", "learn", "work", "first", "person", "prefer"],
      minimalPairs: [
        { target: "bird", contrast: "bard" },
        { target: "heard", contrast: "hard" },
        { target: "work", contrast: "walk" },
        { target: "turn", contrast: "torn" },
      ],
      sentence: "The first person I heard preferred to learn about birds at work.",
      tip:
        "Keep your lips unrounded and hold the length. Both halves matter: rounding sends it to /ɔː/, and shortening it sends it to the schwa, which then sounds unstressed.",
    },
  },
  {
    slug: "uh",
    title: "The /ʌ/ vowel — as in “cup”",
    topic: "Pronunciation",
    tags: VOWEL_TAGS,
    data: {
      symbol: "ʌ",
      kind: "vowel",
      exampleWord: "cup",
      howTo:
        "A short, open, central vowel with completely unrounded lips. The jaw drops more than for the schwa, and the sound is stressed and clear rather than neutral.",
      commonError:
        "Rounding it into /ʊ/ or /ɒ/, so “luck” becomes “look” and “bus” becomes “boss”. English spelling is unhelpful here — the letter “u” in “cup”, “put” and “busy” gives three different vowels, so the spelling cannot be trusted.",
      words: ["cup", "love", "sun", "money", "country", "enough"],
      minimalPairs: [
        { target: "cup", contrast: "cap" },
        { target: "luck", contrast: "look" },
        { target: "bus", contrast: "boss" },
        { target: "cut", contrast: "cat" },
      ],
      sentence: "One month of sunny country weather was more than enough fun.",
      tip:
        "Contrast it with /ʊ/ in “put” and “look”. Those two are close neighbours, and mixing them up produces the “luck / look” confusion that examiners hear often.",
    },
  },
];
