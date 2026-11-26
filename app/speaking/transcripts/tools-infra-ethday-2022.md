---
source: YouTube auto-generated captions
uploaded: 2022-06-20
duration: 1692
---

[00:09] cool well the audience should know the drill at this stage please go to
slido and ask any questions we'll try and cover them towards the end we're going
to have half an hour from around now and to kick things off if we go one by one
then please give a short introduction as well as an introduction about the the
project that you work for hello it works nice hello my name is simon i work for
a company called edgenode it's a core dev behind working on the graph protocol
the graph protocol is a indexing and querying protocol on ethereum and other
networks cool it's working hey guys i'm francesco i'm working at a company
called consensus and those days i'm basically like working with community and
developer relations team and you know building top of the funnel trying to
engage with web3 developers every day to events and anything anything that has
to do with building hey i'm austin griffith i'm supported by the ef i work on
developer tooling and developer onboarding uh i built scaffold eth and then
around that i wrote a curriculum called speedrun ethereum and

[01:21] you can go to speedruneetherium.com if you're a developer and learn how
to build on ethereum cool cool bow tie over there well you've got a real fan
there i like that bow tie thank you thank you austin um yeah well to kick things
off i think you know with tools and infrastructure right you really exist kind
of behind the scenes um can you talk a little bit about you know what problems
you actually go about solving within the ecosystem and why you think they're
really important because i think you have some different viewpoints on this yeah
sure i mean the graph source the the data reading problem actually that we have
on blockchains so a blockchain protocol basically is optimized for writing and
also incentivized you pay the miners to uh mine your block so you can write to
the blockchain but if you want to read stuff from it it actually gets a little
bit more complex because you need to dig through all those transactions on the
blockchain let's say for uni swap if you if you want to see the the charts about
the the trading volumes and the prices and it's powered by the graph because
otherwise this page would would take i know maybe a half an hour to load sure i
can just um you know extend a little bit what are the challenges i see in the
industry right cross chain

[02:33] liquidity i think that's a big one i think you know we should support um
we should support basically like what we're trying to build with those metamask
snaps is uh is uh nothing else and extensions for non-evm compatible blockchain
i think you know anyone has the the right to build on on different chains and uh
i'm i think this is a big challenge that we have to solve in those days i think
so i think my tools are kind of like just for developers they're not really
behind the scenes it's more just like uh like burner wallets are good for like a
developer to quickly be able to interface with a smart contract without having
to sign a bunch of transactions uh i will kind of like lean back a little bit
here and give props to these guys when it comes to uh there's kind of like
building the infrastructure and then decentralizing the infrastructure and
building the wallet and making the wallet super safe so people don't lose money
right so behind the scenes uh these folks are working really really hard not
just making the thing work but making it decentralized and making it safe so you
know props props to these guys thanks i just i just want to say across to these
guys because this guy and nader are basically the top of the final educator and
ever yeah and

[03:47] patrick yeah great great i'd like to i'd like to double click on that
decentralized aspect aspect that you just mentioned because obviously i think as
there are these providers these infrastructure providers ultimately they start
centralized and then there is this argument of of progressive decentralization
but it's kind of like the necessary devil in a way like what are your thoughts
about that um about these types of providers and can it cause unnecessary
centralization and reliance i think there was an incident with infuria where it
went down for a while and you know that broke a lot of stuff unfortunately but
then it was fixed so it's okay i mean i think the graph by itself is actually an
interesting uh example of this progressive decentralization as the hosted
service as we see today and actually also currently powers uni swap for example
that i talked before um is the centralized server that was that is actually now
ran by etch a node but seen but it was a necessary to build it in a centralized
way in the beginning to actually have this proof of concept and then to play
around with the concept of subgraphs how to interact with such a thing and then
and but now since one year uh it is possible to use the decentralized graph
network and actually doing the same thing that you do with the host

[05:00] service in a decentralized way so i think uh for the complexity of
protocols like the graph it's inevitable somehow if we come at it from the
perspective of a builder if i if i'm trying to quickly spin up uh an nft display
i'm not going to build my own indexer i'm not going to parse the chain in the
browser i'm going to find the easiest npm package to install so it shows those
nfts and a lot of times that's going to be some central server that that could
fall over right so on our end we need to do a good job of having those packages
available that are decentralized that have you know the full breadth of
decentralization behind it so it doesn't fall over the same but if we come at it
from the developer's point of view you have to understand that they're going to
grab the first thing off the shelf that works they're going to try three things
and the one that works is the one that's going to get shipped right so we need
to do a good job behind the scenes of having that mpm package be as resilient as
possible yeah i just want to add on that that for example like as you're saying
developers want to get stuff built quickly right and uh you know
decentralization is a progress a progression it's not like

[06:12] binary zero to one so basically you just progress you know in fewer is
not centralized maybe it will be you know like is is a progression that is
actually making uh people and developers building quicker stuff easier and uh
you know we are just getting there we are so early in the space and i think it's
just a matter of time that you see all these solutions spin out maybe
centralized and then decentralized i love you know the way that you know austin
is building scaffolding like it's it's part of a journey you know and maybe you
know in the future or maybe they're already there you know like front-end
libraries that you can pre-build and and having basically like 24 hours
hackathon mvp done in in in a fraction of the time you know i remember four
years ago it was like such a nightmare and and now it's totally different well
how how do you think like the speed of development versus five years ago versus
it is now do you think there is a considerable difference or do you think there
are still some major hurdles that people have to jump through both yeah it's
still it's like way faster now right like when we see it i feel like about eath
new york 2019 i started to see it really speed up we started to see instead of i
did this one hackathon project that took all weekend

[07:24] to get this you know gross html page up where i could click this and the
metamask came up to now i'm building a block or i'm using a set of building
blocks and i'm building a product with those building blocks and that was like
2019 and i i would give a lot of props to the hard hat guys i feel like that was
one of the big pieces of infrastructure that came in that just was just like 20
earmuffs over here consensus guy it was like 20 or 30 better than truffle and i
think it sped up development and developers enjoyed it so like that's that's one
big one so i think development has sped up it is a lot easier there's a lot more
things on the shelf it's a lot easier to grab a few building blocks and make a
product but i think we have a long ways to go especially in the realm of
decentralizing these things and making these things more resilient yeah yeah and
i mean five years ago when i started uh working in the space then i mean the
graph didn't exist and so we had this we had to do this indexing by ourselves
vbr kind of beaver i worked for the project called melonport that's now enzyme
we were fully dedicated to uh to being fully decentralized and then we in the
end we ended up kind of shipping an electron app that people needed to

[08:36] download and then you started up that app and the first thing it does is
it starts to index the blockchain for you so you so we can actually display some
charts and that was so cumbersome and so in that regard there is a step forward
but still some some stuff when i look at it kind of compared to web 2 tech like
if you look at react for example kind of how battle tested it is as a library
and then you look at some libraries that are heavily used in the blockchain
space where it's kind you still have kind of these rough edges then you think
okay maybe there needs to be more more thought on it and more people working on
this well if if you see like from your perspective ideally this is outside of
your project but it may also be something inside it's like what do you think has
really been the biggest breakthrough in terms of tools and infrastructure like
is there one thing that you can point out and said that made a huge impact on
the industry the graph counts the graph uh hard hat i think is another big one i
mean i think every you know roll ups roll ups and the you know faster
transaction cheaper transaction and uh

[09:50] and deployment infrastructure you know like in fewer alchemy those those
guys you know even like alchemy like creating competition for the same thing
right yeah yeah scaffolding delirium but i think not only like about tooling
infrastructure like a big um you know a big change that we had compared five
years ago is educational resources like you know like you get those guys like
that there's they're making educational content and people from web 2 can spin
up their dabs in what less than 40 hours even like in what it was eat to buy
that you spin up like on may net you know half an hour workshop that was amazing
right nice um obviously the big talk of the town at the moment is the merge um
what kind of impact do you think that this will have on on infrastructure
providers if any and also all the tools the indexing things like this i mean for
for the graph what i know is like the indexers um they kind of need to index the
beacon chain completely and at some point they need to upgrade the aragon thing
and and for them it will be quite challenging um but but it will i mean
everybody's looking forward to it

[11:04] and other than that the graph doesn't really take that much care of it
because it just sees the blockchain as one history so i don't expect big hiccups
there and from the standpoint again from the standpoint of the lazy developer
who just wants to build something everything is technically going to work the
same except we're going to get some new tools to play with like bls signatures
and stuff like i i'm still like oh what's going to happen yeah it's uh from from
what i've heard from the standpoint of the caveman developer that just wants to
build a product on top everything will work pretty much similar you'll just get
some new tools to add to your your toolbox yeah yeah mostly this uh this engine
api and we will perform the the the load of work but i i just want to say
basically the things that will not change because we're in the developer
conference today will probably be the developer experience and uh and by the way
tomorrow we will interview also like team and and drake on on on the merge
changes and we want to say like he is always drake is always using this metaphor
about changing the diesel uh the diesel car with the electric car while you are
in a freeway at 90 and you know the driver even doesn't notice that so it's it's
and that's the

[12:18] developer and i think this metaphor is exactly what what people are
referring to the developer experience will not change but people get much more
secure secure and scalable transaction out of it um i want to remind you guys at
this point please ask questions because we're going to transition to that in a
moment based off of the experience that you guys have had like are there any
kind of um yeah unsolved problems or opportunities that you see in the tools and
infrastructure space or you're wondering why aren't more people doing that have
you ever tried to get the transactions for an account from the chain you
basically have to start from block zero yeah and look through all the
transactions for that address and then move on to block one and look through all
the transactions in the block looking for that address so just indexing is like
a huge issue that like maybe we should build that into the client a little bit
better like wouldn't it be cool if i could query geth for all my transactions
that was really subtle yeah at tooling in general actually i think um uh yes
some of so some of the underlying tools that are that are still used i mean as
good as they are let's say

[13:29] ethers js i mean it's a very good tool but it's just i think it's just
one maintainer right it's not maybe some community maintainers but like
rigmarole counts as multiple people i think that's true that's true it's a base
it's a 10x but so 10 10 developers but still the boss factor is quite quite big
um so so actually but maybe it's also a little bit the strategy of the commons
right so because you can just use ethers there is no token you do not pay for it
and uh so i would love to see more people get involved with this tooling stuff
and really make it solid proof so that we don't have kind of hard bleed problems
on ethereum at some point because just one weak link had a problem yeah
basically like differentiates clients you know and not having this monopoly of
gas for example i think you know people are starting using bayes when they cool
more moreover but but i think yeah that's definitely a monopoly um but what was
the question again the the the unsolved problems that you see in the ecosystem i
think i don't know i would like to see more uh you know front make make life
easier for developer focusing on front-end and focusing more on solidity and and
less on the front end it's always like a pain in those

[14:40] workshops where people you know have you know just give them like a
pre-built uh um front-end libraries i mean basically what's what you're doing
with customers and you spend 10 minutes on the smart contract and 40 minutes on
the react getting elements where they need to be yeah yeah yeah and i don't know
and the other things maybe is a little bit different but i think dao you more
more down aggregator toolings because right now we have a bunch of aggregator
defy lama and and everybody spinning those aggregator out about the layer two we
saw before with with uh with uh rollups but i think you know the aggregator more
information about governance they're educating much more like also the the end
users um and you know a part of that i think also maybe you know smart contract
security platform you know you have fuzzing you have diligence you have
different things but it's still very difficult to the end user to understand
quickly if a project is some sort of like you know not well done as from the
technical level right um i think tooling around this might be you know like even
no code security platform i don't know even like the seed phrase and a private
key and when you lose it you're host forever right it's awful ux that's like i
would

[15:54] i would call that an unsolved problem just because we haven't built a
great smart contract well i mean there's great smart contract wallets out there
gnosis safes argents uh but like maybe there's some things that need to change
at the plat the the protocol level to make those smart contracts more powerful
like delegated execution and stuff like that but that's another unsolved problem
it's just like that bad ux of losing that's a whole bag of eggs basically yeah
and we're talking about how difficult it is to build on this stack and how a
lazy developer will pull something off the shelf maybe maybe if it was less
complicated there'd be less developer apathy toward decentralizing and the
developer would be thinking about decentralization out of the box and maybe that
we we'd see better products getting built yeah that's fair um is there anything
from like the pro the stuff that you're working on currently about maybe your
road map that you would maybe like to share or something cool that's on the on
the horizon alpha win token is that a win token i mean the the graph roadmap was
recently published and there is a lot going on with cross cross chain indexing
uh indexing other chains

[17:08] indexing other data sources like rv um is planned cosmos is on on the
way and a lot of improvements in in terms of indexing speed there's also much to
see in the next uh in the next month um it's definitely checking checking i mean
like it's probably a i know five to ten paper pages a blog post with a lot of
information but if you are curious what's going on in the graph then that's a
good place to start yeah i want to say decentralization is all about community
rights we're building tools to give power back to the developers so like for
example as i mentioned before like this cross chain liquidity you know like
people should being able to build on top of an infrastructure for example i
don't know metamask building snaps you know the community the developer are
building those naps you know they have the pain point they don't they don't have
like this solana i don't know integration bull beam build your snap you know it
should not be like you know that the team at this core having all the due
diligence on the ground it should be that the community is starting to build
something like what's happening with the roll-ups and layer twos right people
are feeling a pale pain point and they just

[18:20] start building on top of this layer and i think that's why like this i'm
super pumped about these extensions on top of metamasks that are not owned by
mitamas is some sort of like layered layer one for all all the problems that
people solve not just about um you know that's why i'm i'm i'm quite excited
about that yeah cool i'm bringing in i'm bringing in the last question and i
thought of another problem in the space and that's how expensive audits are we
need more auditors in the space to make audits cheaper and i think that with
build guild and with scaffolding we're focusing on kind of the one like you
you've gone zero to one you understand how to deploy a nft and a token but
really understanding the space takes this whole tour of duty where you need to
build a whole bunch of things a decks and a multi-sig and you need to get closer
to being auditor level and we as an ecosystem need to put challenges up and
resources up to get people from i can build a simple dex to i can actually audit
this like amm platform and just have a better auditing ecosystem what are your
what are your top tools that you suggest to developers to use it today like for
for auditing easier and

[19:32] faster i i'm a terrible auditor so i don't think i would be the best
person to ask i hear like foundry is a really great new tool for running tests
quickly shout out to georgios on that one cool well we can now go to some of the
audience questions so the first one is and one of you can answer this and we can
go from there uh but how are l2 sequences kept censorship resistance i don't
know enough about it at like the protocol level to know how it works i think
that's the question for twitter yeah yeah you got to ask l2 guys but what's cool
about those sequencers on optimism is they're earning a bunch of fees and those
fees are getting fed back into public goods and it's like at the protocol level
so there's something else happening there that's very magical that i'm really
interested in and it's the public goods the retroactive public goods funding
cool cool all right got a retro pgf fan in the house all right this one is how
will the graph scale well well for layer 2 chains quick swap had some issues
with their analytics page on polygon when blocks moved faster than the indexing
yeah yeah i like the questions

[20:46] it's actually this one keeps me very busy or like the whole team uh the
answer is uh there was so the graph did kind of decentralized development into
core dev teams and actually by doing so the first core dev team after at your
node was streaming fast and streaming force created a technology called the fire
hose which can increase indexing speed 10x and more and this thing is currently
being rolled out and that will more or less solve that problem and i saw it
already in the demos and it really looks uh impressive and um so this will be
rolled out but more kind of more performance things are are actually in the
making indexing performance is actually one of the highest priority if you go to
the roadmap you see there are a lot of initiatives just targeting it exactly
that problem cool thanks for sharing sounds like a tough one one question is
around the new tools for after the merge could you maybe mention some of them my
my one two was the bls signature where you can use groups of people to sign
things cool so like yeah that was all i know okay um and then there was another
one

[22:00] about the tools aimed towards security i think you mentioned one um are
there any other tools around security for the audience well you should take on
the ethernet challenge that's one of the first things you should do uh hard hat
and foundry are both great like write good tests uh go see previous audits uh a
lot of i was talking to an auditor the other day and the way they train their
new audits or their new hires is basically have them audit stuff before they
audit stuff and see if they can find it go find an audit and before you read it
try to audit the contract and see if you can find things first right there's
tons of audits out there where you can learn a lot from it just start by going
to solidity by example and looking through all the attacks and go and reproduce
those attacks either in remix or scaffolding or hard hat or foundry and just
like reproduce them and learn how how those attacks work that's going to get you
a lot closer to being able to become a real auditor yeah you tried out fuzzing
that that's also quite interesting with the new release there's one more
question about how do you see wallets in games and the easy interactions of the
blockchain and like

[23:12] i guess for you with metamask is that something you're actively working
on for what for gaming it's wallets and gaming yeah i mean i'm i'm quite
interested to see like gaming on layer twos you know like those uh avagoji even
like side chains on you know not not mentioning you know skeleton axis but it's
super interesting how they scale up but uh but i think a dedicated wallet for
for use cases makes sense but i think it's better to to focus on the the main
use case and then build on top having for example snaps extension for like
gamers that are actually allowing you know specific um specific methods to do
stuff i think uh and i mean your demo was great about the gaming that you spin
up in those in one hour less than one hour we we kind of showed how the burner
wallet was powerful there right where i i basically had a character on a map and
i was moving that character north or south or east or west and with metamask
it's a lot more secure but when i hit north it pops a thing up i say yes we wait
a little bit the block gets mined the piece moves i hit north again repeat that
whole process but then what i did was i send a little money to a

[24:24] burner wallet and you'll see a lot of blockchain games using session
wallets burner wallets where you fund a wallet that's less secure because you've
got a private key in local storage but then behind the scenes that wallet is
signing transactions very quickly and i was able to like go left left left left
left up up up up and they're all transactions and they're getting signed and
they're going to the mim pool and they're getting mined but there's no there's
not that like pop-up right and i can almost imagine a version of metamask and i
bet dan will never do this but a little autopilot check checkbox that just
sounds like like keep keep like if i keep sending you transactions of this type
less than a dollar just go ahead and send them for this session right he's like
dan will never do that going going back to we want to make things usable but
security is like the most important part there right super thank you um and the
last question is do you have any tips for like the educational providers to
encourage devs more towards infrastructure as opposed to building the apps or
actually do you feel like there's actually a fair balance at the moment

[25:38] i think it's i think it's just like awareness right i feel like when i
built my first app and it was totally insecure i got like griefed a lot like bro
this is not secure right like there's a lot of griefing and it's like oh okay i
need to do a better job of making this more decentralized or something just like
awareness within the space yes you pulled those things off the shelf yes you
made an nft app pretty quickly but here's all the like six places where that's
gonna fall over when it actually like gets it gets pushed on by anything yeah
yeah i was the one i had awareness i was when i had like you know going to
hackathon and trying to build spin up stuff easy and then when you actually have
this type of like um you know education even going you know trying to you know
get some you know third party um third-party company advisory trying to help out
you know contribute to the house i think it's you know it's just a progression
of things and uh and then you will just keep up uh you know keep up uh doing
what you love basically cool well do you have any closing comments or things
that you want to share with the audience or speedrun ethereum.com if you are a
developer or you know a

[26:52] developer that's a web to developer that wants to get into web3 tell
them to speed run ethereum oh my god or developer dao come to developer dao and
go even if you want to learn there are a lot of helpful people around a lot of
del operado people are also here so this is a very good place to start yeah i
don't know just keep learning and and build uh build cool stuff right and just
have mentors around you like and uh like like this guy here it's like someone
was asking me out here if they're not a technical person or they're not a
developer how do they get into space and my answer was become a power user get
meta mask learn how that seed phrase works uh go swap some tokens go get an ens
name go deploy a gnosis safe understand how a multi-sig works like become a
power user and everything else will fall into place there's always a job to be
done somewhere that's fair well please give a big round of applause to these
panelists thank you so much for coming absolute pleasure
