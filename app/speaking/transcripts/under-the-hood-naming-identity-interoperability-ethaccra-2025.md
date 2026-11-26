---
source: YouTube auto-generated captions
uploaded: 2025-07-25
duration: 4366
---

[00:00] Hi everyone. Um I welcome you to our ENS workshop ENS um under the hood.
Everything about naming identity etc. Um here's abna. Speaking as you all know
people know me under abna. Not even my full legal name. I think it's a wonderful
way to explain that your identity your name in where wherever you go whether
it's a hackathon or in any forecast or um Twitter etc people identify with the
with your name and I think it's beautiful to see that you can bring your name
various platform and I think that's the opening for this workshop where Simon
and Gre will explain everything about the E behind it the future etc and maybe
also give you some alpha for the hackathon known that it's happening in roughly
45 days what kind of project they want to see and yes the stage is yours and I
just want to mention it that it's interactive if you have any questions just
drop it in the Q&A session raise your hand we'll give you the mic so um you can
place your questions the stage is yours and happy learning >> hello everybody hi
my name is uh Simon I

[01:14] recently joined the labs um to for developer relations. That's why I
also bring Craig here as my as my backup if I say something wrong or uh yeah but
anyways I'm happy to be here and looking forward to come to Ara also in August.
I know it's actually September beginning of September but I will be there
already in August. Um but yeah let's start with the presentation. That's all.
Okay. Um I think this is good, huh?

[01:58] >> Okay. >> Yeah. >> All right. Uh yeah. So what are we talking about?
Like ENS under the hood. uh you know most people uh know ENS as you know just
name to address resolution or like on the other side address to name but like
there's way more in the ENS uh protocol or the whole the ENS um system and we
want to kind of walk through some of these um things. So first like a quick um
reminder what is ENS? So basically ENS stands for Ethereum name service. It is a
decentralized permissionless name protocol that lives on Ethereum and scales to
the entire internet as of now. uh soon TM uh currently the whole team is working
on namechain and ENS v2 uh which will launch towards the end of the year um
where then like the ENS protocol moves to namechain but as of now uh the
protocol mainly lives on Ethereum but it also interacts with other layer 2s um
as we see later in the presentation. So very basically uh ENS turns complex hex
addresses into human readable names. So you see Greg's um

[03:12] address which is the 0x blah blah blah. I mean you probably saw that
already 100 times. Uh basically translates to Gregscril. Um and we can say that
ENS is what is ENS is for blockchains or crypto what DNS is for the internet. So
nobody goes onto the internet and types 142.251.41 40.23. 238 into a web browser
like everybody just types google.com and on the same way um we don't think that
anybody should type or copy paste addresses uh too much we think uh it should be
something as correct or upn um as you just said so anywhere you can put an IP
address browser use DNS domains as I said and so then anywhere you read or write
an address you should be able to use an ENS names this is kind of like what ENS
stands for.

[04:12] Um yes and uh so ENS is not only just the system but like as the whole
power is uh that it is um kind of the power is that it is uh integrated in so
many different um tools. just see the that in the speaker version we don't see
uh the animation but yeah anyway so you know that we can maybe later on do some
demo so when you use metam mask or any other uh wallet uh usually when we type
in an an ENS name it resolves to the ENS address so um that works for MetaMask
it works for rainbow wallet and that works for ether scan and so on so forth so
it's pretty common and that's all powered by in the background by Usually NS you
don't even see it's working it just works. So there are two processes that we
distinguish.

[05:10] So the one is the forward resolution. So it's standard one. So you see
nicto uh that resolves here are two different address like two addresses. They
are not different but on different chains and then we also have like this
reverse resolution um where we have uh an address that results to a name. So
these are two different things. Um, when working professionally with with ENS,
uh, it's important to know that the reverse resolution or the so-called primary
name needs to be set explicitly. Or maybe in more computer science terms, it's
um, it's a many to one relationship. So like one address can only point to one
primary name whereas one name can point to multiple addresses and also multiple
name can point to the same can can point to the same address um but there's only
one primary name.

[06:01] It's important because uh yeah so that when we have an address we want
to be sure that it it resolves properly. Okay. Um as I said like uh EN also used
in in on different applications. Uh so so we see that later on this these
widgets that we see here um they are they can be used. So we so for example when
you when you program uh your application uh and you use a VM or Rainbow and all
that cool stuff Rainbow Kit then ENS integration is usually already there out of
the box. Um yes. So and also we think uh this ENS names is more than just like a
name and it's also even more like an username. We already understand that that
they are portable. So the cool thing about ENS is once you have your ETH address
everywhere it is supported and like ENS is supported and that's actually almost
everywhere in the Ethereum ecosystem and and even more and coming more and more
into the broader crypto ecosystem. um the names are supported. So when you see
here like Greg's krill or Greg has already has just greet but then on all

[07:16] of these um uh applica apps or deps uh he has already uh a profile so to
say that's because they are portable. So just just know the username it's a
profile and when we look when we go on on app.ns ENS domains. Um, we can look up
the the actual entries. And when we look here at Greg's entry, um, then we see
that uh it's he has like profile picture set like there is a bio set. There's
even like a a city set. Um, there's the the Twitter account or the X account,
the GitHub account, and addresses for different chains. Um, also other records.
We dive deeper into it into this later, but there is a lot of different stuff
that we can put onto uh an ENS name. So, it's just not not only name to address,
but there also like text records. Uh there's also like a whole ownership thing
behind the scenes like who owns it, who owns the name, who can manage the name,
and there is there are even subnames. You can look into that later.

[08:24] The one thing that I think a lot of people also don't get right with
with the confs is like that it's not only just one name to one address that
results but we can like behind one name. So this is my example SCS to the I can
set different addresses. So here for example like yeah on Ethereum it's uh
there's also the 0x54 blah blah blah address but I can also set the Solana
address which is different and also uh I can set a different address on
arbitrum. Um so so that's actually important because a lot of people don't
really set these L2 names or like even uh nonem name uh addresses correctly but
uh ENS has that power. So in the end, the cool thing is that I can tell anybody
who wants to send me money, just send it to SCS.

[09:15] regardless if they are on uh Ethereum base or Solana or whatever. Um can
also add a bitcoin address. So in the end is in the the application to interpret
which address they want to they want to resolve. Um, also something that I think
it's interesting, we can set the avatar and we can even set it uh to a to an um
to NFT that I actually own. So, this is a it's an NFT uh from a Ghanian artist
actually that I bought at some point and I can set it here and and and I just
need to put that avatar record to that thing and then like in in the background
the the system looks do I own that NFD?

[10:00] And if yes, then I set it as a profile picture. That's very convenient.
But also what a lot of people don't know that we see on the next slide is that
it's not only like the ETH addresses but also like we can bring inbox addresses.
That's one tool that pretty neatly works with ENS for managing um like other
domains but also like any com or whatever domain actually can be imported here
as long as it is um it supports the DNS sex standard. This is a pre
precondition. Um but yeah, what I see a lot of people actually have um or one of
the critiques that people have with with ENS like there is some there's some
like cost to it. So like the the ENS name cost some money per year but um we
even have subdomains. I touched on this before. So for example on base uh
probably the most prominent subdomain provider that we have uh I think the names
are free. So everybody can just like uh claim their base names and which which
is basically free and that works more or less the same in in ENS as like a a
name. So it's pretty cool. So most people probably know Jesse Pollock um with
his uh base address um but also

[11:16] properly set with a um with avatar and then a bio. uh X accounts and and
and GitHub account as Greg has um uh also set on his address. Okay, cool. So why
do all the things? So as I said like we think that crypto power experience
should never interact with hex addresses um as nobody interacts with IP
addresses. There are also like security considerations in that regard. Um yes
because uh the the security like with with a hex address we might we might make
copy paste errors but like with with uh ENS addresses that there's no type or
like the address either resolves um but yes that says uh that Ethereum by itself
stands like this and this and now you understand where the logo is coming from.
So, ENS is basically kind of this convenience shell around Ethereum, like a user
experience shell that makes it easier to interact with Ethereum.

[12:23] Okay, cool. Um, do we have any questions so far? No. Okay, I go forward.
All right. Um, yes. So, how does ENS work? So think of ENS especially V1 as as
just like a as a registry maybe like a table where we have a name that that has
a resolver. The resolver is not necessarily um the is not the name it's not the
address that it resolves but it's like it's a smart contract that's configured
that we know we can ask to resolve the name. Um and different uh names have
different resolvers. So we look at based on ETH which has a different resolver
and this resolver basically helps with the subdomains. Um but and and uh yeah so
on this 0x4976 resolver which is the public resolver uh when we ask for Greg
Sriv it returns us uh basically an array with uh addresses that are configured
for Greg Live or we can ask for that for that array. You can also have like some
text records. So as I said like there are is there was the avatar that the

[13:35] description um and even more I think um the IP or the the X accounts and
the GitHub account are also stored in text in text records. So we have address
records, text records and also the content hash. Um we look at the content hash
later. Um but the content hash basically says there's IPFS hash where we can
upload the static file or static website to IPFS and then link it to ENS which
generates this unogable static websites. I show that um a little bit later. Um
yes and as we looked at the one from base uh there are also offchain resolvers.
So that they're not the public ones it's offchain resolvers. Um and did this
through the protocol called CCIP read. So whenever someone tries to uh resolve
like chess.base base the the smart contracts on Ethereum mainet would revert for
that read call if an offchain lookup um error so to say but uh and then in the
front end we can look into this offchain lookup and it will tell us where to
look up um yeah and so basically

[14:48] here you see the UML diagram so uh it it tries to resolve it it reverts
s then it asks the gateway that can resolve it and then it can get it from a
database or it can get it from an L2 and returns that data but here it's very
important that um the data that is returned it comes with a signature that then
can again be verified against the smart contract and then it's the return data
because like it could be that somewhere here you know like the the API is broken
or hacked or whatever but like a hacked API cannot return a data that is that
can be verified here. So it's a it's a pretty secure way of um getting offchain
data. Uh there's a whole specification to to read about. Uh it's a cool system.
Um but it is basically how it works. So we can have resolvers that also resolve
from offchain sources or L tools as of now.

[15:46] >> Yeah, there was a question. No. >> Yeah, that there um two questions.
one I will read out from um AJ Michael he's asking how scalable is ENS when we
consider potential millions of name lookups happening across L2s and multi-chain
ecosystems I like that it's a cool that's a cool question thank you um so the
thing is let's think about scalability um so when we interact with Ethereum like
Ethereum doesn't have any scaling issues. I mean like the only scaling issue
that we have with Ethereum actually it's a pretty big one is the gas prices but
um but like uh to to to register ENS names like it works on Ethereum and as long
as Ethereum works uh you can register and manage your Ethereum your names. So in
the 10 years of anniversary that we will celebrate next week, I think one of the
claims is that Ethereum has updown of 100%. Which is actually quite impressive.
Um when you look at traditional systems that that struggle to keep up with
uptime of uh 99.99% or

[17:03] something like that, but Ethereum has uptime 100%. So like that's the
that's the cool thing about the decentralized technology that that it is on the
quality of Ethereum is that it's basically never goes down. So even like if if a
billion of people start to interact with Ethereum, the only thing that happens
is that gas prices spike. I mean that's inconvenient. But like with ENS, I would
say mostly people read from ENS. They don't write to ENS. So as as long as you
own your name and you have your addresses configured like regardless how high
the gas cost is, the reading on the onchain reading is always um kind of free.
like I put that in in brackets because it's not 100% free. Usually we we when we
use MetaMask we read from Ethereum through Infura gateways and they might or
Infura nodes and they might go down and as a developer you might use um you know
Alchemy or or other providers that give you Jason RPC access also those can go
down but you always have the option to run your own you know uh Ethereum node at
your home and and that one that just syncs with the network and and you can
always read from it. So that's not an issue. So

[18:17] having said that um sure there are like if if you think of the whole
system and later on there's also like an ENS node and also the that helps of
with retrieving that data. um they can go down the but the system like the core
of of the protocol cannot go down or would can only go down if Ethereum goes
down or the smart contracts are hacked them but that's where both are extremely
unlikely. Um does that answer the question? Michael, um I gave you the
permission to talk. So if you want to um add or speak, feel free. So >> Oh,
okay. Hello. Please can you hear me?

[19:04] >> Hi. >> Yes, we can hear you. >> Oh, okay. Yeah, it it does answer the
question a bit because I know as you said uh there's been work being done around
this TCIP, the rate to offload resolution, but I'm wondering whether there's
trade-offs like latency, trust assumptions, and maybe some decentralization
risk. >> Yeah. Is there like a road map or approach for making it like truly
scalable and multi-chain? >> Yes. So yeah, I'm sure there are risks involved.
Greg, do you want to jump in? >> Yeah, I can also add more to this. So it's a
good question. There are lots of different ways to implement um CCIP read and
what you see in the kind of uh two arrows. So you have the implementation
specific logic on the right side and then the kind of call back verification on
the left side. Those two things can be customized to be um completely trustless
and that they read a storage slot from a layer 2 RPC URL and then they verify
that against the um like state route of the layer 2 on layer 1 in

[20:19] kind of the bridge contract. So it gets pretty technical but um in that
best implementation it means that anybody can run their own gateway actually and
you can do ENS requests to your own gateway instead of you know a public one
that anybody else runs. So this makes it um basically the same like scalability
uh characteristics that we have for L1 and L2s today. Like Simon said, if you're
using an RPC URL and it stops working for some reason, you know, you get rate
limited or it's just a bad provider, you can always run your own or you can
always run another one. And so for as long as people want to use ENS, then
somebody will offer a better and faster uh solution. Uh and again, like the
beauty of all of this in the best implementation is that it's completely
trustless and anybody can run their own.

[21:13] Um so from a scalability side it it's pretty flexible. >> Okay. Thank
you. Thank you. I'll look more to that. >> Yeah. also if you if you start to
look into I mean there's the road map for for namechain is maybe interesting
here which uh should also help with with that and also um but generally said the
as Greg Greg also elaborated on that there is a there is some risk assumptions
going with uh CCIP read or uh which are mostly used for subnames but if you
really want to kind of stay on the safe ite then the recommendation is to
actually buy a domain uh a second level domain like grec or whatever so you can
maybe I don't know if adai or michael adai is already is available um but but if
you have a really a domain then then you have like the the the highest form of
uh uh decentralization and you know censorship resistance and everything cool
okay >> all right thank you >> yeah thanks for question. Um let's move on. So
what can we build? Um like as as

[22:27] said before like every anywhere you build an app you want hex address it
should use an ENS name. So that's what we want to see actually for the hackathon
or also for your for your side projects. These are hackathon slides. So like
yeah for AI we might want to have um you know uh usernames. Uh we can have
usernames for your AI boards text records and so on so forth. uh for for social
we can also work username avatars maybe even have like uh you know arbitrary
text records that integrate into your application for a wallet we can use the
avatar the primary names that content hash I will show you quickly and there is
also uh the during uh thing that you might want to get yourself familiar before
uh the ea cro hacketon and Greg will give a quick speedrun later about that. Um,
which is a is a way to emit your own subnames. Uh, so I know a or I know ether.

[23:29] Can maybe emit start to emit subnames like uh michael. Etherra. And
cintia. And whatever. Um, and so when you build your own application, let's say
you build a wallet that's targeted at people in West Africa, uh, you you might
not want uh, say that everybody needs to pay this um, this money to buy a
address. You can just buy one address uh, for your project and then start to
give the subnames to your to your users as a as an onboarding and then with that
all those subnames, they work across the stack um, as it would. Uh, yeah. So
there's secure code and yeah last but not least uh yeah there's a documentation
page that you can look up and there's also the ENS developers telegram that you
can join. So I would actually recommend to join that one because that that's a
cool group with with smart developers and you can ask questions there 247 and we
try to answer them also as quick as possible.

[24:30] Um yeah, I'll leave that slide open for five, four, three, two, one
seconds. Yeah, Abna. >> Um there I think someone has has raised his hand. He
wants to um place his question. Samuel, I I allow you to speak. Is that okay? >>
Mhm. Sorry for me. >> Okay. >> Hello. Hi. >> Yes, s we can hear you. >> Good
evening and great to be here. Um my question goes to C1 and it's about um
security because um assigning identity to wireless address is a big no for me
and you know doing this with ENS kind of like giving hackers or attackers an
easy work to do and with the case of ZK which is trying to hide identity of
developers. is why should we consider this as a good practice to do?

[25:34] >> That's a very good question. That brings me actually um so to to to
some demos. Um so basically what what what I have with my ENS name or ABNA has
or like most people here also Greg with the public ENS names is it public this
these are public um profiles and I think it's important to be aware that they
are actually public and and for me it's clear like whatever I do on SCS to leave
with the addresses that are there that's something I also am comfortable with if
the whole world knows you know you can look me up and you see like there's
there's some money there. Um and then and then and then do some stuff on chain.
Um there even apps a cool apps like interface that you can actually track people
and see what they're doing.

[26:27] Um, so that's one thing, but sure, like I would not want to, for
example, have my salary being paid through my public ENS address because then
everybody sees my salary and and I don't know, like in Switzerland, we are very
secretive about the money in general, but I think it's anyways good practice
that not everybody knows how much money that you that everybody has. Um, so for
that actually I want to quickly go to something else. Um, let me share my screen
again. And this time the whole screen.

[27:13] So you see my whole screen, huh? >> Yeah. >> So this actually >> So this
is actually interesting project. It's called the fluid key. Um and now when you
see for examp the metra series like 0x594. Okay. And then I refresh and then you
see it goes a little bit dark and then it gives a new one the 0x1 EB. So this is
a very cool feature and I and we saw like also people at E global con to play
around with this. It's called the so-called stealth addresses. There are also
like documentation about this. But with generally what it does with stealth
addresses and ENS actually supports is that when I have um that the the
resolver, you know, that is that that you see here, this resolver set up
correctly every 10 seconds or so or 15 seconds or so creates a new address. Um,
and that's that's cool, but and but so on the blockchain, these are like these
addresses don't have anything to do with each other. Like they're fresh

[28:24] addresses. They're just there. But fluid key, they created a system that
with with one primary key, I can manage all these addresses, but only me, only
the one that owns that primary key. So that's actually pretty cool. And I want
to actually at some point set it up something like so pay.s.eth. So then I can
just uh send this um name to the people that want to pay me and everybody that
wants to pay me receives a new address and only me knows that these are actually
my addresses uh and nobody else. Uh that's actually pretty cool and I think that
resolves privacy issues to a high degree. I think the other thing that's also
worth mentioning is uh when we look at uh my name um is the ownership or
actually oh maybe that's actually the wrong the wrong example but we can have
like different owner than manager. Yeah, here you have you have it. So you see
here here I have a

[29:36] different owner set and a different manager. So and the the idea is that
you set the the owner uh to a cold wallet um that that you don't interact with
every day and then you have the manager maybe in your hot wallet, you know, in
your MetaMask or rainbow wallet that you have on your phone. Um, and then as it
happens with everybody that interacts in in crypto from time to time, maybe we
click on the wrong on the wrong stuff and the current our hot wallet can can get
emptied because we were not careful with seeing what we sign. Um, generally
speaking, be careful what you sign, but it happens, you know. So, so when this
would happen and I would lose access to this address or that that one like a
hacker gets access to this address then with I can kind of like bring my owner
address which which is way more secure and I do not interact much uh into play
and just re remove and then kick out the manager and set all the records. That's
a cool thing to still go through my profile. Um, and being the uh being the
owner and have the manager separated.

[30:47] >> Does that answer your question? Daniel, I think was your name? >> No,
Samuel. Samuel, sorry. >> Yes. Yes. Thank you. >> Okay. Thank you. All right.
Then let me go through two more of these examples that I prepared here. So, as I
said before and we looked at um uh the addresses. So, you see Greg has a
different address set. But what I wanted to also go into is the content hash. Um
the cool thing about the content hash is that we can deploy an um a website on
IPFS and then add that content hash here to the ENS name and which then gives
this um you know the Greg. demo. So this is just static HTML. But the cool thing
here is like this is this is very very unogable and also like that scales like
crazy because it's IPFS again like the distributed nodes um and it's it's it's
very hard to attack something like that.

[31:47] I mean we saw recently like this like supply chain attacks where people
were able to to add some um you know arbitrary JavaScript into front-end
websites. Um, with that set up here, that makes it much much harder because the
IPFS hash represents a hash of the file and that hash would change if someone
would try to inject something. That's actually a very cool way of of of creating
decentralized websites. I think uh I have it here. No. So that's that. So you
can go to eve.limo um and that's a whole thing about like how to do it, who uses
it, blah blah blah blah. So this it's also a project that's worth uh talking
about. So we looked at this I looked at this. Yeah.

[32:33] Then another cool project I like to highlight is like nscribe. So the
idea is um to to really have to to to name also contracts that are deployed to
to any chain actually and then we can look it up um tocribe. Did I type it
wrongly? All right.

[33:17] Better. Yeah. So, they uh so yeah, they said their um said they said ENS
name is primates for their contract addresses. It's a pretty cool tool that I
like that helps doing this. Um yeah, Durine. We we looked at it with during you
can create your own subnames or ENS subdomains um that we see that often at
hackathons people actually implement this. So as a preparation maybe for EA
crowd be ready go through this and find out how to how to use subnames because
you can do a lot of of cool stuff with it. Um then ENS node uh thing to to query
data from ENS. So either you can do this either through the the graph the subg
graph but that's only for Ethereum mainet but like with with the ENS node there
is like subname support and so on so forth. So um yeah also a very cool project
that helps a lot with building and then maybe a quick also like for uh for uh
the Ethereum follow protocol also built on top of ENS um that we can follow
people um here and see what they do. So as I said before like see these

[34:30] are like all public stuff. So we see for example like that Mike Dates
from Rainbow Wallet for just um bought some Moosecoin uh for $10. Um yeah and
that that roughly bought something on OpenC and so on so forth. So it's actually
uh it's pretty cool. So this is actually powered by interface as I said like
it's a it's tool to stalk people on chain but yeah we we we do that with our
public profiles but obviously we also want to have like private profiles that we
are not that public about all right uh questions otherwise I go into live coding
I do maybe 10 minutes okay >> I think I think you can go to live coding it's
okay Okay. All right. All right. Um Okay.

[35:37] Actually, I think I need to run one password. Okay. Just the background.
So, uh I don't know. So, we have this caffie. Um they also will give workshops
at Ether Crow. It's cool thing to get started but what I'm usually do is just
like do npx create E latest and then I go to a terminal and just copy paste that
thing. And what it does in the background is like it spins up um uh a full a
full like full stack web 3 or like Ethereum development thing and it already has
ENS integrated. Um, so while it's installing, what did I say?

[36:20] Ethers. Okay, I can actually already uh start V coding in. Um, yeah. So,
what what it does? So, we have like it bootstraps this readme file here. can
read everything and then uh by default it has two packages like hard hat or
NexJS. Um but yeah sometime it makes sometimes cool to maybe start with uh
already subgraph support or with ponder support or uh you are even more
extensions. So it's actually pretty cool to quickly spin up um any website or
like any any tool. So um let's see it should not take too much time.

[37:14] Here we go. Nice. Okay. So let's follow just instruction and basically
actually maybe I do that directly here so that I can ask AI for help. um which
is in the first terminal I do yarn chain I do another terminal I do yarn deploy
then on Start and then I already have like a um a local development environment
set up.

[38:25] Okay. Um, and yeah, what what's already uh here is that Oops. So that
that when we use this, it already works. See, I can go with SSD. It already
automatically gives me gets my profile picture and gets the address out. So,
this is already given um thanks to um you know this uh the address input here as
you can see. Um yes. So, basically that's all you need to go go to get started
with ENS. Um maybe I know Greg if you can uh quickly show the the Durine
subnames in 10 minutes that might be super interesting also.

[39:17] >> Yeah. Um so I have a number of things that I was going to walk
through. I probably will not uh have time to get to all of them at this point
but I will >> but but Greg it no worries. I mean if you need to more time just
take your time. >> I mean >> cool >> we are flexible. It's up to you to your
schedule. >> Yeah. Um I will I will start and and see how we're feeling. Um but
before I do, I'm going to start sharing my screen. While I figure that out, if
anybody has questions, now is a good kind of point to stop and ask. Um but if
not, I will get this sorted in just a second. Okay. And sorry if you hear
background music. I'm in New York and somebody's playing music very loud on the
street in a car right now. Um, okay. So, can you all see my screen?

[40:10] This ENS design system? Great. Um, and you can hear me? Okay, awesome.
So, there are a few things that I want to walk through. Um, this is my kind of
Oh, it's getting louder. Um, this is my kind of quick agenda. So, I'm going to
show you Thorin, our component library and design system that will help you
build very easily and quickly front-end applications. Um, I will show you our
front-end template which basically uses Thorin and shows you how to again move
quickly in a front-end application and then I'll talk a little bit about
subdomains and some tools that we have around that um and maybe a full
integration but I don't know with timing. So, let me start by saying um if
you're building a front-end application, you don't want to be bogged down by
like building each little component and making sure things look nice. And so, we
have Thorin to kind of help with that.

[41:04] It is a design system that gives you a bunch of components like buttons
and inputs and cards and all these different things that will make it very easy
for you to build um interfaces that work well and feel good and look nice for
your users. And I think that is very important. Um if you are building with you
know AI tools you can add um this thing called context 7 to your LLMs and this
is trained on thoren and so you should be able to say like build an application
or build a form that uses an input from thoren with context 7 and it will kind
of um use the docs to um build that based on all the available data. So, if
you're into AI coding, I highly recommend Context 7. Uh, this website kind of
walks you through how to use it and Thorin is already in here.

[42:01] Um, cool. Moving forward, a the best example of using Thorin is probably
in this front-end template. Um, I will drop a link. Actually, I don't know if
there's a chat for me to drop a link in, but maybe just um look at the link here
and start for later. But it's basically an application with very popular tech
stack um Nex.js, Thorin, Wagami, VM, Rainbow Kit, and so on. Uh and this will
give you a good starting ground for building front-end applications. So, now
that we have that, I'm just going to show you kind of what it looks like. I
already have the front-end template open on the side for me and I'm going to run
it over here. It looks very basic. It's just so that you can install something
and get coding immediately. Um, and this will get started now. Cool. There are
two examples um of Thorne using ENS in a way that you might want to in your
application. The first is what Simon mentioned in the slides early on. The idea
with ENS is that anywhere you see an address, you're either reading an

[43:14] address from a web page or you're typing one in, um, you should be able
to use an ENS name instead. And so, as an example, you might have an input box
somewhere in your app that transfers assets to a different wallet or looks for a
token or looks for a contract or anything like that. And that input should
always support ENS. Um, and so just to show you this is, you know, how it would
work in reality. You can type a name. You can also type an address. It's just
like a universal input box. Um, the code for that is very simple. Um, built into
I was playing around with this earlier, so there are some I guess um dependency
errors, but we can ignore that because it works. um built into all of the
popular libraries that you use today like Wagmei and VM is builtin ENS
functionality. And so really what all that we're doing here is calling use ENS
address once something is in the input box that could potentially be an ENS
name. One thing that I'll call out here, a common misconception is that people
think ENS is only ETH. But again, as Simon mentioned earlier, ENS supports
ethames

[44:28] as kind of the native onchain TLD and also supports all DNS TLDDS. So
that's com.xyz.io. Really, anything can be a valid DNS name. And so in a
implementation like this, you want to make sure that you're trying to resolve a
name as soon as there's a string with a dot like uh a dotparated string. So as
soon as you see something like this, you should assume that it can be an ENS
name and try to resolve it. So what this means is the code shouldn't just be
like if the string includes eith check if it can be resolved to an address. It's
any dots string. Um and so yeah, the implementation is quite simple. If there's
a dot in the input, we will run this hook to see if there's an ENS address. If
not, then we pass it undefined and it won't look up that address. Another thing
that I want to point out that people often forget and maybe I should make this a
bit bigger is all ENS resolution starts from Ethereum mainet or let's say from
L1. So Ethereum mainet or Sapoleia for a test net. And the reason this has to
happen is because

[45:41] the ENS registry is on layer 1 and that serves as kind of the thing that
can gather any data you need. That's the starting point for everything. And so
people will try and leave this out and they get confused why it's not working.
But the reason is because if your user is connected to base for example and they
run this use ENS hook, use ENS address hook, it will look for the ENS registry
on base, but that doesn't exist. And so regardless of what chain your user is
on, ENS resolution should always start from the layer one. So in this case, ch
ID 1 is for mainet or in wagmi you could always do ID for test net resolution.
Um so very simple. Um this is an example of writing an ENS name. And then the
other thing that I mentioned is reading an ENS name.

[46:36] So for example on ether scan um this is what again Simon showed before.
It is much easier to understand what's happening in a transaction like this when
Gregsil is sending something out to zk.ns.gregs. This is a smart contract or if
I'm transferring tokens to somebody else. Um, an ENS name is much easier to see
kind of what's happening. It brings more context to any given transaction. And
the way you do that is instead of a used ENS address hook, again, very simple.
It is just a use. Oh, that's the wrong file. It is simply a use ensame hook. Um,
and I guess it's a little bit abstracted in here, but what this looks like is I
have a connect button. I'm not connected right now. If I do connect my wallet,
then boom, it kind of recognizes me as Greg. That is my portable web 3 identity,
my global profile. Um, and just to show you again in Wagme, this is use ens.

[47:51] It takes an address and it gives you a result of the name itself. Um, I
will stop here before I kind of talk about subdomains and more L2 stuff. Do do
these code examples give you a good understanding of what's happening um based
on everything that Simon talked about in the slides or is there anything
confusing yet? I'll wait a few seconds. Okay, no questions. Great. Then I will
talk about subdomains. Subdomains are a big part of ENS these days. Um the
reason is because some of the scalability questions that somebody was asking
before you know normal ethnames so like gregirl.ethnames we call that a second
level domain because the top level is the second level is gregirl so gregirl.eth
is a second level domain. Um, those are on mainet Ethereum, which is great. That
is the most decentralized type of name you could possibly have. But in order to
get that, you have to pay Ethereum gas fees, which sometimes can be high. And so
subdomains allow you to issue or it's

[49:06] possible to issue subdomains to your users on layer 2 chains or offchain
or basically in a more flexible way that allows your users to acquire a name for
free or for very cheap. kind of however you want. >> This is all powered by a
technology called CCIP read, which again Simon mentioned earlier. Um, so I don't
necessarily plan to walk through the details of how that works again here, but
CCIP read is what powers both off-chain subnames and L2 subnames. Given this is
a uh you know crypto hackathon and we like things being onchain, we will stick
to a demo of um onchain L2 subnames. And that brings us back to Duran. So Duran
is basically an a toolkit that makes it easy to create subdomains on any layer 2
of your choice for an ENS name. Um I will walk through it quickly.

[50:06] And for the sake of time, I'm not going to actually deploy it, but I
will walk through it so that it can be as easy as possible if you go to do it.
Um, this would be useful if you're building an application that you have new
users sign up to that likely wouldn't already have an ENS name. Um, one point of
confusion that I often see is like regardless of who signs up to the app, the
application wants to give their users a subdomain. Um, which is cool. You know,
users are used to creating a username in each application. But the beauty of ENS
again is that's your portable web 3 username, uh, your portable profile. And so
if your user already has a name or some other name, you really don't need to
give them a subname. It's simply a onboarding tool so that your users never have
to experience a hex address. So that's just like the way I would think about it
if I was building something and trying to onboard users. Um, subdomains are not
a product that everybody needs to have. It's simply a solution if a new user
doesn't already have a name. Um, what this allows you to do is connect a name
that you have on L1, again, mainet or Solia,

[51:19] and choose an L2 chain to pair that with. There are a number of options
here, also test net or mainet. And it kind of takes care of that CCIP read part
that we talked about earlier, that off-chain gateway and that custom L1 resolver
contract. That's taken care of for you with DUR. And what this walks you
through, maybe I'll just deploy half of it because I'll deploy the easy part. um
over here if I deploy this registry what's happening is on baseia it just
deployed a contract that allows you to register names under Alice and this is
very easy you know it has everything that you could possibly need to create
subal and kind of do a bunch of flexible things on top of that. The next step is
to connect that L2 registry to your L1 name. This is kind of the CCIP read part.

[52:27] And then it asks you to deploy a registar. A registar is a smart
contract that your users actually interact with directly and it kind of makes
the system more flexible. So what this means is that I can't as a user just go
to this L2 registry right now and call the register function. Um or like well
there is no register function. It's kind of a more technical abstraction on top
of registrations. And what you have to do is deploy a registar contract that
under the hood registers names in this registry. And what that looks like is
this.

[53:15] This is what has a register function. And it looks more complicated than
it is just because of all the comments. It's actually very few lines of code
without all of these comments. Um, and when you register a name, it basically
creates a node as we call it in the registry. Uh, and that is kind of creating
the ENS name as an NFT. Um, the reason again we have to do this is because some
people might want to build subdomains that you have to that users have to pay
for like you you charge a user to register sub.name.eth others might want to
require that you own some unrelated NFT or basically customize the business
logic as we would call it um of this registar contract.

[53:58] And so we say okay let's create a standard registry that is fairly
unopinionated and allow people to customize this registar which like pushes
calls through to the registry and so this is your opportunity to really
customize things any way you want um and yeah build it into your application
build it into your other contracts and so on. Once you deploy that, you would
basically as the admin of this registry call add registar to approve your
contract the ability to register names in the base registry and then you're good
to go. Users can register names through whatever logic you decide to codify over
here.

[54:44] Um and then you have subdomains on a layer 2 network of your choice. Um
this website kind of walks you through all of the steps alongside the repo which
is also um open source and kind of walks you through the steps. So whichever one
you decide to go through a little bit more technical or um a little bit more
abstracted but the starting point for both of those is dur.deepth. Um I'll pause
here for questions and then I will just talk about one more thing before we wrap
up if there are none. Okay, great. Our audience is all experts today with with
no questions. Um, okay. The last thing that I will talk about kind of builds on
top of the layer 2 subdomains and is this idea of a primary name on a layer 2.
So, Simon talked about primary names earlier. It's basically the ability to
request a name for a given address. And this is useful if you are ever showing,
you know, historic transactions for an address or really anywhere you have an
address on a

[55:57] page, you'd want to show that as an ENS name. The way you do that is by
fetching the user's primary name. Today, that today on mainet at least, that
ability is only possible on L1 Ethereum. And so even if your users have a
subdomain on layer 2, it's actually not super usable unless they make an L1
transaction. Uh and so that's what we're changing and that's something cool that
you guys can hack on and actually will be live by the time um Ether Craw kind of
begins. It should be live in like 10 days based on uh the latest information. Um
I will walk you through how that works and it's basically the same way as it
works on mainet Ethereum but deployed to base optimism arbitrum scroll and
linear. Um this document here primary names under docs.ndomains um walks through
the normal primary name stuff and then has a section on L2 primary names.

[57:02] There are for the first time a set of ENS contracts deployed to all of
these L2 chains that have a similar interface of set name that a user can set
their primary name directly or set name for address with signature that allows
you as a developer to basically sponsor um the setting of a primary name for
your users. And this becomes really useful because you can finally have an
endto-end experience on an L2 for ENS. And so this means a user can sign up to
your application that's built on base for example. You can issue them a
subdomain on base if they don't already have an ENS name and then you can set
their primary name on base as part of your um registration transaction. And so
whenever they go around the Ethereum ecosystem to other apps that are built on
Bass, they would be able to show that user as whatever name you've registered
for them instead of just a random hex address. So to recap, it becomes this kind
of portable web3 profile and is not just a name that you can type in to get to
an address, but truly anywhere this person goes around the Ethereum ecosystem,
they are basically identified as this name. Um,

[58:15] so primary names really close the loop on making an ENS a portable uh
web 3 identity. And so it's a very important part of the stack that I think
you'll have fun um playing with. So it is available on all of those test nets
that I mentioned right now with the relevant contracts linked in the same docs
page. Um and again by the time the hackathon starts it will also be live on
mainet. So that's something that we'd be um excited to see kind of an endto-end
ENS experience on L2s between customizing a smart contract to register names
setting the primary name and showing that in an application. Um, but yeah, that
is everything that I wanted to walk through today. Thank you guys for staying a
few minutes late. Um, if there are any questions, I'm sure we can take it during
the next few minutes.

[59:08] Um, but I guess I'll hand it back to Simon or Abna to uh close us out if
there are none. >> Thank you so much. Can you hear me? >> Yes. >> Yes. Hey,
Greg. Thank you so much. I'm really excited. Um, I learned a lot today. Wow. I
have to be honest. Um, but I would love to hack um if I'm not organizing. But
hey, anyone of the audience, you have questions. I think we will also start
loading up um like documentation on our TAI dashboard. But if you have any
questions, feel free. Don't be shy. I think now it's the time. I um Michael has
another question. Yeah, feel free.

[59:54] The stage is yours. >> Okay, please can you hear me? >> Yes, we can hear
you. >> Okay. So, uh how you spoke about the ENS registry tracking the owners
node? So whether it's a top level name like Michaelit or like a subdomain like
dev.mich. But let's say once I start handling out the subdomains say in a DA or
community project how do I manage trust and control like without giving full
central back because like I don't want to be the god admin of my own name space
and end up with people DMing me like hey bro I lost my subdomain help.

[1:00:39] Um yeah so I think high level there are there are different options of
what you can do. Um dur is just a assuming you are thinking about doing this on
a layer 2. Um dur is just a starting point by default. If if somebody registers
a name, then it is fully theirs and I don't think uh I'd have to refresh myself
with the exact code, but I don't think that the owner of the contract can
actually do anything and take the name back. It would be fully um like
trustless. If somebody owns dev.eth then michael.eth can't necessarily like take
back dev.

[1:01:27] um at least not easily. And if you want to change that, you certainly
could. Um because yeah, DUR is just a starting point and allows you to customize
really anything you want. Oh, I stopped sharing my screen already. But um I
would recommend looking through the smart contracts for Duran, which you can
also find on duran.dev. There's a link to the GitHub repo. Um, and if you wanted
to customize it so that there's an admin who can provoke names, you can
certainly do that. Um, they're both valid ENS names. They will work the same way
in terms of resolution. And so it's kind of like however you want to do it, it's
possible. ENS is extremely flexible, almost sometimes too much to where people
ask like, can I do this or this or should I do this or this? I was like, yes.
And it's like you can pretty much do anything you want. And so sometimes that is
almost overwhelming. But um yeah, basically if you want to have admin control,
you can add that in. I don't think it's endurance today.

[1:02:33] >> Um but if you want it to be permissionless, you can also do
that. >> Great, great, great, great. So do do you also think subdomains could
like evolve into like decentralized identity primitives like the Michael like
dev. that it's becoming a web three email login or like a voting identity across
like DAPs or is too low for that kind of absion. >> Yeah. So I would say ENS is
very much part of the kind of web 3 identity stack. Um you mentioned email and
websites says two things. There are a few things that I can share about that. Um
there is this project called ZK email which builds things not necessarily um all
related to ENS, but they built a project recently that allows you to do
something about using your ENS as an email uh in a kind of like trustless
provable way. I don't know the details about it, but I would kind of look into
that if you're curious about the email side of things. Um, as far as websites
go, I have a better example for you. Um, so any ENS name can attach what we call

[1:03:50] a content hash to it. The content hash is basically a pointer to some
sort of uh decentralized storage on IPFS or Arweave or a couple other networks.
Um, it looks something like this. This is a IPFS hash. And so if you attach an
IPFS hash to your name, um that kind of becomes a decentralized website because
the ENS name is like the website domain and the content hash points to the value
of it. And since is not uh you're not able to look up a name in browsers by
default, like I can't just do this. there are a number of gateways that exist to
where um they basically abstract that for you.

[1:04:35] So an example would be right we have vital I want to look up the
content hash so I will add limo e.limmo limo is what Simon mentioned before is
kind of that um oh dark mode thing is broken um but yeah e.m limo is basically a
gateway and so what it does under the hood is it sees I'm requesting metallic it
resolves the content hash for that it resolves that data from IPFS and it serves
that under a nice convenient domain here and so whenever Vitalic shares a blog
post on on Twitter, he will share a link to vital.eth.limmo um and that's
serving the content from IPFS and so um a lot of people say a website is part of
your identity. This is basically using ENS as that decentralized identity and um
relating it to the website and the name and kind of tying everything together.

[1:05:34] >> I see. I see. I mean I mean that was solid. That was solid. I
really appreciate you breaking it down like that. I didn't expect to enjoy like
learning about registries and subdomain this much. I might just go start having
out some pre subdomains eat like candy now. >> I'm glad. Yeah, if you I'm happy
to go as um high level or as technical as you'd like and we'll be helping out
during the hackathon as well. So um it sounds like you have some digging to do
but once you have more questions we're happy to help. >> Thank you. >> Of
course. Yeah, you can always join the ENS developers telegram as I shared before
and uh ask questions there.

[1:06:18] >> Yes, another way to find that is in the bottom page of everything
on the docs or the bottom of every page in the docs right here. >> Uh somehow we
don't know how to reactivate the chat here in this webinar setup. >> Yeah. >>
Yes. Sorry, for some reason I don't know how it should work. But hey, if you
have any other question um but the chat is I think the chat is open. Ah, sorry.
Eric has a question. Yes. Yes. Um sorry at this stage I I think I just give you
um Eric you can talk please. Yeah, I see I see the question like okay >> uh
assuming I issue subdomains to my D users. Now I want the users to use
subdomains within my only uh I don't know if this is possible since you said as
long as the names have been issued they can use it anywhere. So you want to um
basically build usernames just for your application that don't work anywhere
else. It sounds like um

[1:07:32] yeah, I mean ENS is meant to be this kind of universal profile that
that works everywhere. I would say that's really the value of it. And so if you
want just private um usernames, then ENS may not be the best fit for you. Um, I
would say typically when people are building crypto applications, part of the
ethos is like composability and having something work everywhere. So, um, if
that's something that you're interested in, ENS is a great choice. But yeah, if
you want something that only works within your own app specifically, then um,
maybe ENS isn't the best fit for you. Eric, does he answer your question?

[1:08:26] Are there any other questions? People also say thank you so much.
Dennis said thank you um for everything. >> Oops. >> Thanks for joining. >> Yes,
guys, don't feel shy. I mean, do you have any other questions? Um, see a couple
more minutes. I think you can place a question in Q&A session or you can raise
your hand as you wish and we give you the mic. >> That's all right. Um >> if
people have question Okay. >> Yeah. If they look into it more, we're always
available to help. >> But I think >> Okay. I mean Okay. Okay. I think there are
no other questions so far. Um I think you already shared the Q&A uh the QR code.
they can join the telegram group otherwise we will also have um all the
documentation is going to be shared for the hackathon later on in the hikai um
dashboard so you have additional question and I think Simon Greg will be also at
the hackathon so you can also ask them questions or ping them on telegram etc I
honestly I really enjoyed this um as you can see Michael was very

[1:09:41] intrigued to learn a lot it's good to see that um it resonates with
the interest of the people and also thanks for Simon and Greg for taking your
time sharing your expertise and knowledge. It's always a pleasure. Um I think if
you don't have anything then I will close it very soon. Otherwise you have any
words that you want to share Simon Greg you want to see how people can prepare.
If you're excited the stage is yours. Yeah, I think um read through the ENS
docs, join the Telegram, uh ask us if you have questions. We'd love to help you
come up with ideas for the hackathon um or help you debug as you're working on
your project. And so, um we are, you know, excited to support, but otherwise,
thanks for spending the time to uh hang out here with us today.

[1:10:35] >> A well said. Looking forward to see you in person and uh yeah,
happy hacking. Play around with stuff and uh don't be shy. Come to the telegram
and ask questions. There are no stupid questions. >> Uh Godfred, he erased his
hand. Okay, Godfred, you can speak now. >> Thank you so much. Um, please can get
the Telegram link again. I missed that. >> Oh, wait. >> We I don't know if we
can share it in the chat because we can't seem to um turn on the chat. But if
you go to docs.n.domains domains over here and you go to any page, there will be
a link to the Telegram group in the bottom left corner. Um, and if you click
this, you should be able to join. Yeah.

[1:11:41] >> Oh, okay. Great. Thank you so much. >> Wait, I I also have a
hack. >> I can share my screen again. >> Yes. Okay, now you see it. the cure
code on the right. >> Thank you. >> And for those that are on a mobile phone,
maybe you want to do a screenshot now. >> We'll take it later. Yeah, we need to
work on that chat. But also maybe AB, we can send um an email to all attendees
uh maybe tomorrow with the most important links. >> Oh yes, yes, I think that
would be great. We will do that. Okay, I think yeah, we'll do a followup with um
the most important links. So, have you prepared for everything. Thank you so
much. Um it was a pleasure.

[1:12:38] I will close it. Bye. Thank you. Bye bye everyone.
