---
source: YouTube auto-generated captions
uploaded: 2025-11-23
duration: 2666
---

[00:00] Okay. Hola Argentina. Hello world. Good morning everybody. It's it's
been almost a week for most of us here at Dev Connect. I hope you've had a good
experience. Um I've noticed there's actually lots of people here on Dev Connect
coming that are not in the industry which is amazing. It seems like we are
bridging the gap more and more as an industry with general consumers. Today's
main topic um is going to be about a agents. How uh we in this world where
everything is becoming more and more digitalized, more and more fast. Um how we
can bring uh credibility to it on chain. All right. Uh we're going to be kicking
off the today's conference uh with great panelists uh who worked on ERC8004.

[01:05] We're going to be having uh Sumit Chugul from Netmind, Quintto Skilborn
from Flashbots, Marco De Rosi from Metam Mask, and David Karpis from Ethereum
Foundation where Marco and David, they're both uh actually the uh makers of
ERC 8004. So, this is going to be a very good panel to listen to. So, let's
please give them an applause and start soon. >> The order.

[01:52] >> Yes. Let's sit following the order. >> Yeah, sounds good. >> Maybe it
would be good if you sit like >> [sighs] >> Hello everybody. Um, thanks for
joining uh that early but I think it's worth it. We have like a very nice uh and
interesting panel here. Um yeah, my name is Simon and I think the easiest thing
to start is with a round of introduction like who are you, what do you do and
also what do you think is the achantic economy in two years from now. Maybe we
start with Marco. I'm Marco AI at MetaMask and I'm um currently focused on
ERC804, a protocol that we recently created with many builders and organization
to have an open standard controlled by anybody leveraging blockchain
technologies to enable agents to interact among each other, find each other,
trust each other and in two years that's just I think an enabling primitive. Um
we are very early. We need better models. And what I think is interesting is
that it's not just about better models in the traditional sense of machine
learning. They need to learn from interacting with other agents. And

[03:04] that's why the rails that we're building are very useful so that model
agents can start interacting each other and becoming better with what's uh
called for example uh reinforcement learning. >> Okay. Nice. Thanks so much. Uh
Sumit. >> Hi everyone. Uh I am Sumit. I'm building Chaos. So Chaos is an
accountability protocol for the agency economy. So we are tackling what what
will enable agents to be as autonomous as possible. So we have uh like trust
primitives like 804 is one of that we are building on top of that. Uh and then
X402 of course like enables agents to have more flexibility in terms of like
payments and all that. And then with our accountability protocol we are
incentivizing agents to show agency. We call it proof of agency. So with this we
hope like in two years we will have uh much more better agents which will be
showing agency and and getting us to this autonomous future.

[03:57] >> Okay, thanks so much and uh Davidid. >> Hi I'm David Elite AI at the
Dream Foundation. I'm also co-author of ERC 804 and we also work on uh the X42
extension to the agent to agent protocol. So we are really focused on like uh
creating the core infrastructure for AI coordination on Ethereum. Yeah, I think
the um agentic economy on Ethereum in two years like what I would like to see is
like a massive diversity of like agents but also like tools and like uh services
that these agents can use. uh they're all kind of like tapping into Ethereum for
like payment, decentralized trust and I think that's where we can really build
some applications that cannot be built if you don't have like this massive
ecosystem of like different services. So I'm excited about that.

[04:50] >> Okay. >> Uh I'm Quintis and is this is it on I'm Quintis. I'm from
Flashbots. Uh I'm a researcher there. In some sense you could say I've been
working on the agentic economy just with very dumb agents for quite some time
now. Um and a couple 18 months ago I sort of realized that TE is a very
important part of uh the internet to come and the trust model is very bad. And
so I've I've spent most of my time working on sort of developing better more
secure hardware uh to support the you know all the TE use cases I'm sure we'll
talk about today and that's somewhat outside of flashbots. >> Okay cool. Thank
you so much for the introduction. Um so one question I have um for you Marco is
basically with ERC 804 so it's a agent registry but also a reputation system
right okay um so when when reading through this spec I was wondering like why
are these combined you could also have them separate and say like there's a a
registry and then in a separate ERC is the um uh the trust system why did you
decide to keep it together >> so technically in Um in the smart contracts there
are two different smart contracts. We are in the same ERC

[06:03] because standards have also like a role in defining a direction for a
community if the community is excited about it. Well technically the relation is
that the object of a reputation at the station should be an identity in the
identity registry. So actually uh they they are uh connected. I think it's
important like to to keep in mind that what we're building um includes different
level of product market fit. uh identity and and payments. I don't think there
is any doubt that of course we need them and they will work and uh and of course
agents need programmable money. They can't like use paper notes. It's it's like
the blockchains are the perfect technology for for agents while for for
reputation that's a different thing because we don't have like distributed
reputation among humans while we have identity and payments among humans. And
here the beta which is like to be confirmed that I'm like super excited about it
is that since agents are better than humans in aggregating data in real time
basically um AI will be the trigger for reputation and distributed reputation
that doesn't like uh but with humans who was like managed in a pretty uh
medieval way like me calling you should I bo or is that person nice and um so
reputation and

[07:17] validation have definitely a different level of uh uh PMF compared to
identity and payments. >> So, do I hear that right that you also think like that
system can be used to give reputation for humans? >> Well, technically yes. I I
I I'm just saying that um it's in the nature of things and evolution and we just
can't stop it because it's very efficient to have many entities that sends
messages and reputation signals around each other >> as it's already happening
uh when we need to I don't know pick a restaurant or or um we are a bank and
deciding if we want to do a to give a loan to somebody my goal to avoid like
this topic futures where like a big brother issue centralized government
basically decide what's your reputation or mine is that all these signals are
public good and then it's left to uh to everybody to decide how to aggregate
them and that's why I think blockchains are incredibly useful because they
provide logically centralized entry points to stuff that you can also store
offchain >> yeah okay that's good yeah I mean onchain I think we're all the same
right agents and humans uh to a certain degree unless we come with a sele
detection

[08:30] mechanism But um speaking of the big problem, >> you remember at the
beginning of the web the meme behind the screen nobody knows that you are a dog.
They say behind the blockchain you don't know if you're a human. >> Yeah. So
it's actually it's also super interesting that we see this will compete with
agents but I'm not afraid currently. Um but David speaking of a big brother I
have um a question that looking through the specification we see like one of the
co-authors is uh from Google and I mean like being in the space for a while
Google was always a little bit kind of painted as the evil and we need to be
careful. So why why did that change like what what's what's happening now? How
is the collaboration with Google fruitful? >> Yeah. So we work with Jordan Ellis
is um yeah so Jordan is like a senior engineer at Google but he actually is a
co-author of the ERC as an individual contribution and um he's been around
Ethereum but this is kind of the first concrete contribution that he makes and
um yeah I think it's quite exciting that like these people like are getting
closer to our ecosystem um uh like we need to expand right like I think admium
is as valuable if it's relevant for everyone So like as an individual
contributor

[09:43] like I'm very excited the way this collaboration started is like we
actually worked together before on this uh X42 extension of this A2A protocol
which was created by Google but then like they um gifted it to the Linux
Foundation. So now he's under like mutual governance of the Linux Foundation and
so that's how we met Jordan and then he had like of course worked in this space
uh for a while technically. So uh that's how it started. Yeah. Okay. So would
you agree on the saying that we say like whenever things are you know really
open source then like it doesn't matter from who it actually comes. >> Yeah.
Yeah. Yeah. Yeah. I think um uh open source is like uh really related to like
2004 and the community because like yeah we'll talk maybe later with Quintus as
well like uh to have like really sovereign AI we need to like put AIS in TES and
uh if the only AI is behind of uh open AI API then uh there is no like sovereign
AI. So yeah very excited about the open source uh ethos in general.

[10:50] Yeah. >> Yeah. Yeah. Me too. Like um what brings to to tees I have have
that question a bit like I mean I'm not an expert in that field. I'm happy that
I have some on the panel now. So um trying to alert myself. So when I I try to
use um models the ones that we have like locally like because you know it's it's
the ethos but like running an open source model locally on my MacBook Air it's
not fun. Um but then when I think about trust execution environments I think
what we need or maybe I'm wrong in order to have a trust execution environment I
think it makes the calculation even more complex in order to be trusted right so
like these huge models that already burn a lot of resources then running that in
a trusted execution environment doesn't it like even slow it down so or where is
the the latest of research who who knows Sumit or Quint >> and then Quintus can
end.

[11:47] >> Uh yeah, for sure. So u there are two parts to this like uh and we
call this process integrity. One is of course like verifiable execution of the
model itself and then verifiable execution and of course like secure execution
for the agent and it's it's it's going to be of course like extra computational
burden on when we want to run it locally. uh but right now we are using for
example like iggon compute like they're bringing up an amazing stack uh network
of tees which whose performance like is quite impressive. So u something like
compute could be in a way solution for sure to run heavy workflows. Now other
part of this uh process integrity is like verifiable claims. So agent might
claim for example like I'm using a specific data set and this is the best I'm
using best data um uh API tools and stuff like that. So we need to also have
that attestation of of this claims. So TE is one solution right but then we are
starting with TE's right now but then there would be other solutions we'll be
looking into like based on ZK and then watermarking and and stuff like that
which could you know like uh improve as we move forward in terms of efficiency.

[12:56] >> Okay. I think Quintus I heard over here that you work on hardware for
TEES right? >> Yeah. >> Yeah. >> I maybe just want to add on to that. I would
say that the um in the broader space of solutions TEES are pretty low overhead
um like inherently as they are today. There's some qualifications like one is
that um you know for example currently most uh GPU TEES only support having like
basically having one VM running one GPUte uh and really ideally you want to have
one CPU VM running multiple GPUE. It's not so important exactly what that is but
there's just like some maturity that needs to come into the ecosystem. Um and if
we do push for security later on then maybe the overhead grows uh but currently
the overhead uh from a lot of benchmarks is like a couple of percent.

[13:51] Uh which is uh which is not crazy I would say. Yeah. >> Okay. So it's
pretty cool. So I can run my models in trust execution environments in in the
cloud and can trust that and it's not that much of overhead. >> Uh it's not that
much overhead. The the the trust question is is an interesting one, right? It
depends sort of uh what you're comparing it against. Um it's I would say it's
much much better to use a TE than to run something in plain text and just trust
the operator. Uh but still these uh these TEES bake in some trust assumptions,
right? So they don't have physical protections and so you're trusting the cloud
provider. Um they are closed source running on like hardware that you don't and
low-level firmware that you don't have insight into. So you're trusting Nvidia
and Intel. Um, and then there's a question of how good the security really is.
We'll see as as time goes by and the the incentive for breaking them, uh, grows.
Uh, and so what I'm working on is trying to avoid a world where everyone gets
really excited about TEES. Uh, and two years from now, TE's are everywhere, all
the agents running TEES. But what that really means is that we've just like
baked Nvidia into the trust assumption of the agentic

[15:04] economy, you know. >> Okay. Do you own any Nvidia shares? And uh I have
some some uh indices which probably have invite I would say yes seems say
yes. >> Okay. Um one interesting story when we talk about about agents and also
privacy which was a big topic this week. um is this idea that I don't know about
you but like sometimes I use uh this my clothes code also as my therapist which
makes me also a little bit feel weird about my data my inner feelings now shared
with entropic and uh whoever else kind of reads with me um so how how would it
now with 8004 trust execution environment and so on so forth how would like a
you know a privacy protecting uh AI agent work like maybe in two years or five
years maybe Marco you have an idea >> yes privacy is is a continuum it's not
about like black or white solution there are trade-offs for identity of course I
usually want to advertise what you you are you want to do you are open not to do
that but uh I see this as like a public uh uh registry without uh um

[16:19] without let's say privacy same is for reputation if you want to give
signals that have a value for your community. Uh you will do that. While for for
everything related to validation, uh I think we will have like a reputation
around validators. If you trust a validator, you encrypt all your stuff um with
the public key of a TE. The code is executing uh within that and uh and uh the
code will be executed there. >> Okay, that already works to me. Uh so yeah like
we are kind of in the starting phase still right and then we and it's great like
uh different projects are exploring different solutions with and and we can see
in in upcoming years which solution would work. Uh so like of course like we can
for privacy we can start having like again like secure environments on our local
phones and then our client agent which runs locally could be taking care of all
all the privacy related issues and then just you know we are basically uh
establishing a trustless relation with our client agent on our phone and then
our client agent again like in a trustless way is going to interact with one of
the server agents to get get whatever we want and and get results for us. So we
are going to towards that

[17:32] future and and and we will be exploring different uh solutions for
sure. >> Okay. >> But I really think it's important to highlight that it's not a
black or white. So for example AWS which is like one of the main T provider
there are like people in the tea community that they don't even think that nitro
which is their solution is a tea and so I like to call this like basos
custodial. So we will have like many technology many solution and for different
use case we will use different things. What I care about is really like the
people being aware that giving all your health data in your example to to uh in
an encrypted way to to a centralized player is is is bad and I think that we
will learn this as like the general public usually learn from like bad stories
and bad episodes.

[18:17] That's the only because by itself privacy has never been like a great uh
uh way to get traction. So we really need unfortunately incidents to I hope to
to to make sure that billions of people care about it as I would like to. >>
Okay, that brings me actually to to the next point which is um I think as a web
3 space in general we have a little tendency to create solutions for problems
that don't exist right now. Um but on the other hand side to be fair uh if we
anticipate the problem before it exists and we already kind of set up the rails
correctly to avoid it happening then probably it's it's not wrong. So maybe
maybe David you can elaborate a little bit on that. Why do you think um this is
now the right time and how we can collectively also as a space like everybody
here make sure that we go in the right direction.

[19:11] >> Yeah. Yeah. So like um on um in the AI space there is already
emerging standards right. So like there is this MCP the model context protocol
then there was this A2A this agent to agent communication framework and uh these
are actually merging in terms of like standard the way like they represent like
an agent or service like uh allegedly like people are talking that like they're
going to establish like unique standard and the second point is that AI is
moving really fast right so we can already see like automation in like coding
agents uh automation in like research deep research agents and like essentially
like every few months like a new domain of automation gets unlocked. So, uh I
think it's just about the right time, right? So, like um if you think about like
the wave of like AI on blockchains started about two years ago um and I feel
that back then was like a bit early. Um and uh now I think the traction we've
seen with 804 is to me a signal that it is the right time, right?

[20:20] there was already a critical mass of like projects that are doing like
uh agents or looking at AI on ethereum like costchain is one of them there is
like 100 projects that are involved in 804 uh ecosystem so I feel that like the
traction uh that uh this initiative had is like signaling that okay there is
already a group and we are getting together and uh we are trying to create some
infrastructure that uh it's going to grow as like the use cases increase. Um
yeah, so I think this is what make me think that it's maybe the right time. The
other thing is that like of course like uh the first use cases will be more
around tooling I think uh and then like uh we will go into full automation.

[21:08] >> What do you mean by about tooling? Yeah. So like um uh we call like
ERCA 2004 trustless agents. But essentially like you can register any web
service, >> right? So like uh uh any endpoint that you have that like gives uh
takes an input and gives a response. Uh you can give it an identity there and
you can rate like uh its performance like the quality etc. Um yeah and in fact
if you see at the kind of the payment protocol the X42 like the first things are
mostly APIs that are wrapped around this protocol and they allow to paper
call. >> Okay that makes sense. So actually Quintis I have a question for you
also like in in that regard like when you think for for onchain agent builders
what do you think they need to put onchain offchain and what they should really
run in a trust execution environment like where do you uh draw these lines >> uh
that's a I think a complicated question depends maybe on the use case what
should be on chain but I can maybe point to uh some of the important parts so I
think you know what what does a system

[22:20] look like where you have a TE based agent. Um, uh, the user needs some
way of verifying a certificate that tells them this is what's running in the in
the TE and and this is what I'm interacting with. Um, and that doesn't need the
blockchain necessarily. Um where I think the blockchain plays an important role
is for these kind of like public database uh like things like the video is
describing reputation systems uh or you know if if there is um some entity that
I'm relying on to custody my confidential data I send my prompts to it whatever
I send my financial history something like that uh I need to know that someone
is not going to just upgrade the system uh and suddenly change the privacy
properties of it. Uh and so what a lot of the TE projects have been doing is
they've been doing like onchain governance of the of the images. And so um what
this means is that uh we have an onchain smart contract that governs what kind
of software can run in the TEES.

[23:25] Then you have to find the right balance between being able to respond to
vulnerabilities quickly uh while also not being able to rug users by very
quickly also changing what they're interacting with. Uh and this is the same
problem that rollups have as well. Um I think the other stuff that probably
needs to go on chain as well is is if you want to enforce some kind of a strong
commitment, right? You want some conditional payment or something like that, you
can do that in smart contracts. You can do it without smart contracts as well,
but um uh if you're just relying on TES, the security assumptions are weaker
than if you're relying on the blockchain. So probably for higher value use
cases, the blockchain makes the most sense. Outside of that, we'll see what
happens. Yeah. >> Okay. That reminds me a little bit about uh that for example,
unis swap whenever they deploy a new contract, they they put that contract to an
ENS name in order to register. This is the latest one, but you also see the
history what happens. So you see a similar thing happening like with with the
TNT environments. We basically hash the whole stack and put that stack on and
say like this is the thing or as of now in the version X and so as as a as a
consumer of that stack you know okay I'm interacting with that or did it have
changed because in >> yeah I think you can think of um a lot of how TEES work as
just being a chain

[24:39] of certificates. It starts off with a certificate from like Nvidia
saying yes we made a TE and we put this public private key pair inside of this
TE and that is the initial certificate you start with now you know this or you
if you trust Nvidia now this public key is associated with this TE and if you
get a signature from that public key saying this is the software that I'm
running then you know okay that's the software it's running and then you can
encode a key in that and that can sign different things and so it's this like
chain of trust that ends up evolving and the blockchain is helpful there to to
make it transparent and to um like I said control maybe updates to this chain of
trust. >> Yeah. Okay. Yeah, that makes sense. Does anybody have something to add
here? >> Yeah. Yeah, I I can add something. So for autonomous agent economy, we
we of course need something like TES. So this is where we we can run agent code
itself and and also AI models. Uh and then then like trusted hardware that's
great. But then uh for an agentic econ economy you also need to look into the uh
multi-agentic workflows and multi-agentic collaboration. So you have to have
communication for agents and that cannot be onchain. So uh so this this is like
one of the uh essential offchain element onchain we can have

[25:52] commitments and basically hashes of the work packages this multiple
agents are working on. Uh so all the commitments can be done on chain on
Ethereum and uh and and payments also right like uh so agents are going to do a
lot of microtransactions and this is going to bottleneck uh lot of networks and
once we have like millions of agents and billions of agents running online and
and like giving us this autonomous future that we all are dreaming about then
it's going to uh be a problem on chain. So then for that also like we are
looking into like batching the microtransactions uh and and then like submitting
on on Ethereum for example. So that way we can reduce latency and then have
cheaper gas prices also. Now option okay communication is one uh then other
elements are of course related to the the agent logic that will live in the tees
and um the workflows again the events packages. So all these things are are
option with the hashes onchain. Now again like the question is about the trust
and the value of the work. So for that like we we are um setting up like our our
way of like verifying this that's through doing coausal audit of the whole
workflow that basically allows us to zoom into the chain of work and

[27:04] and and detect basically what causative what effect. So this is where we
can uh have a fine grain approach in terms of like detecting if there is any
privacy leakage or like any data injection and and how are agents performing so
that we have a better incentive mechanism so that like all of the entities stay
honest as much as possible. >> Okay. Yeah, that makes sense. >> If I can get
back to your question on solving problems that don't exist. It's something I
really care about. Um so I think like there are two dimensions. One is how much
you're early and the other is how much you're relevant in a sense of
meaningfully relevant. I'm not scared about being early. I'm scared about being
not relevant. And um and a good uh like measure for this is how much what we are
building is relevant for the wider community because the web 3i community is
just something super super small from any like KPI number of people investments
compared to the wider AI space. And for example, if I like to to do a critique
to this amazing Devcon connect event in general, we are talking about a lot
about AI, but it has been hard to involve the general AI people.

[28:06] So we're just web free people talking about web3 AI and um the pitch of
let's have inference running in the so it's privacy preserving uh or like
blockchain enabled economies is not enough. it doesn't work with that space even
if I like I really care about this the pitch not not to be relevant and that I
see is working is that the networks that we're creating enable a new form of
intelligence also through data set that are used to improve AIS and that's what
is relevant globally for like the entire planet and humanity so web free
mechanism open networks is the next step to make AI better and this is something
that the general AI space definitely cares about. So that's I think the the
pitch not to like work on problems that don't exist.

[28:59] >> I'm I'm curious. I I think we all have our own answers, but how do
you think we can do that? How do you think we can surpass the existing rails? >>
So right now models are very early like the quality of models is ultimately what
is really moving the needle. uh we will have better and better agents as it's
happen as it happened in the last six months and these agents will start uh well
paying each other and this will make evident how much using stable coins as a
global fast pay payment settlement is great these agents will start to um to to
like try to find each other and that's why 804 is I think timely because we need
to put the roots of how can we have a catalog which is owned by everybody and
not a GPT store >> so it's really a mix of uh the the models improving creating
demand and these agents needing to talk each other and when and it's already
happening for in the labs models will get and get trained with coordination data
set they will need data set with unknown unpredictable agents that you can only
find in open-ended environment if you are open AI and you run your agent against
the other agents that you have built the kind of data set that you

[30:12] could get is is is not as good as open economies which is how the world
works right so we have grown up as human beings becoming intelligence because we
interacted like at school with just they were unpredicted interaction and that's
that's I mean that's my thesis that's a bet so uh that with models improving we
will see that having these agents playing around in a playground which is open
just brings to stronger intelligence >> I think maybe there's um one framing
that makes what you're doing very compelling to me is to say that look um
ideally for like the good of you know decentralization you end up with this
economy of agents where you don't have a lot of concentration of power um and if
the transaction costs transaction costs here being like very very vague right
security risk actual monetary cost complexity of interacting across agents owned
by different parties is high then people are much more likely to vertically
integrate right like why would they outsource their tasks and take a security
risk or or just get un unclear results when they could just build the same
system in-house and and do that. And so if you guys reduce those

[31:25] costs enough, you're much more likely to end up with a decentralized
economy. So it's not just about being early, it's about influencing the way
forward. Yeah. >> I like the advocacy for that. We we we should create open
rails right now, you know, and I think that's a little bit the ethos in the
space. So, and since this is Dev Connect, I assume um most people in the
audience are developers. And so, what would you say? What should we build right
now? How do do we do I get now home after Defcon connect and make my hands dirty
with the tech in order to push that forward collectively? Maybe David, do you
have an idea? Yeah, maybe I'd say like there is a growing community like uh on
AI coordination with like we've talked about 2004 explor 2 and then like
security as well like uh I would say like uh number one like uh get involved in
this community see what's going on see what people are experimenting with uh
many people will be here today after us speaking if you like today's event
tomorrow we also have an 804 specific one uh it's on the uh main calendar so yep
uh >> there roof behind us >> yeah okay tomorrow over there same time

[32:39] quint uh what what would you see to that people build also with the
flash tooling >> yeah so on the hardware side it it is hard to directly
contribute for many of us because we're software people uh but if you are
interested in supporting in one way or another um t-sh -.org is uh where you can
find information about what we're doing. Um I think also just on the you know my
background is in more like game mechanism design and game theory. I think there
there's a lot of interesting open questions. On the one hand it says the
question is what can we do if we involve security primitives in the AI world
that it wouldn't be able to do otherwise. And there's some interesting uh early
works like uh there's there's a paper called NDAI by Matt Stevenson and the idea
is like look you can make agents forget um and we can't you can't commit to
humans forgetting something and there's lots of interesting like game theory uh
implications of that um so that's also an interesting direction to look at and
and you know as a me person I think MV is really important flash has always
thought that but we've most people really only conceptualize that within the
blockchain space but AI agent s are just able to do what bots did in this

[33:52] like very structured crypto world out in the real world and I think it's
a problem and we need to think of like market solutions for that. So it's just a
fun thing to think about. >> Yeah. >> Yeah. So me I think chaos chain also has a
cool cool avenues to collaborate and build on. >> Oh yeah. So like uh through
like we have chaos SDK which enables uh people to like developers to you know
like try out building verifiable and accountable agents through our triple
verified stack. uh like we are continuously shipping and then we are working on
improving uh the developer experience and then providing more and more uh tools
for having verifiability and accountability through our coal auditing and so
like soon people will be able to you know like experiment like full-fledged uh
autonomous economies that we call studios which will be uh on test network
soon >> cool and Marco for >> this one tagline please build more agents and less
agent platforms that's my my tagline I actually want >> platforms with agents.
So that's that's an issue.

[34:49] >> I wanted to quote you on that because I really liked that on your
slide yesterday. Build agent. So build agents and not agent platforms. Uh I'll
build an agent soon. >> Great. And you will see and I hope people in the
audience too. And uh speaking of people in the audience, we have um couple of
minutes for questions. So like now is the time on Twitter. Nobody asked
questions but uh now maybe you came up with some questions. Don't be shy. >>
Yeah, there are no bad questions. I forgot to ask explain how I'm filed for this
80004, but I think we have a >> a more elaborated one. >> If if you when is the
midnight for 804?

[35:33] >> Could you say it again? >> When is the midnight for 804? >> Oh,
mainet. When is mainet? >> When is mainet? One minute. >> One one minute. Um we
we are um we have different level of of readiness for the different registries.
Uh we really think that we want like to grow the community. what's most
important is start registering agents and having explorers so we can finally see
his agents that he will build tomorrow and and so the the identity registry so
you can like uh start building also explorers will be uh on mainet for sure in
like a couple of weeks two three weeks uh I hope true uh for reputation and
validation like again it's not we we are like coordinating an effort but we're
really talking a lot also with the T community to understand if we want to ship
it as it is do some improvements so it could be in a couple of weeks as well or
or maybe after.

[36:26] >> Okay, more questions I think. >> All right. Uh yeah, me. Yeah, cool.
Thanks. Uh thank you very much for such a great uh panel. Uh I'm Leon. I'm the
founder of Habu AI. We are building the coordination layer for Agentic Finance.
So I want to ask about the the uh you know URC a floor a lot of things about the
reputation layer. So we need a standard. So I just want to get your thoughts
about uh how do you think about the standard whether it's a should be a global
standard or local standard whether it be a general standard or some vertical
standard in different uh domain. Yeah. Thank you. >> Maybe Marco. Yeah. >> Yeah.
So reputation is a multi-dimensional local problem and we don't want and it
would be a very bad idea to define a way to aggregate reputation or how people
should give feedback to or agents to any other agent. What we care about is
making sure that the signals are public. We are totally aware that the like the
openness of the structure you have tag one tag two score um can like lead to a
lot of creativity and to this multi-dimensionality which is exactly the right
thing but it can be like uh not straightforward in understanding uh where to
start from that's a like I would say a cold start problem and so uh we will
continue not to mandate any

[37:40] specific usage but I really expect that the first usages as I think
David I was saying are more like API and service related did. So with basic
stuff like is the endpoint reachable? What's the success rate? How much money
that agent has been done since inception? And this is like a way to to start
having reputation with something that we know very well. In parallel we will of
course have like experimentation. Tomorrow we are like presenting a video game
this topic video game with agents playing prediction market with our agents. So
we will but but I really think that uh um maybe tag one will be the application
space, the reputation space and tag two the specific API that uh um you want to
share info about. >> Yeah.

[38:23] >> Hey everyone, this is Robert Brighton here from practice. I have a
quick question and to Marco's point, build more agents not platforms. I'll be
curious to the panel's thoughts on where would new use cases be for agents.
Ideas. >> Sure. Um so I think it's under our eyes that the the segments that are
in a more advanced state are um trading agents, coding agents and gaming agents.
So I think that here you can like already build stuff that is usable. I think
that what will come and again it's so related about the quality of model and how
the intelligence of network make the models better. This this is step one. Step
two I think it's really about creative agents. So I just spent this morning a
couple of hours playing with creating videos, images or I think that anybody
using social medias is using AI for that. We will have like just autonomous
agents that you assign work to and they like are hired for one month and they so
this is pretty close and the same is like agents planning my trips. I'm really
surprised that I can see like planning my vacation. So this SE stuff like SE
step two maybe come in six months or one year and then for forward looking like
the the list is very wide.

[39:35] We will have a uh scientist agent that I'm really excited about health
doctor agents analyst running in these but here I think we're more in the like
two yearish but but by the way I I don't know I I'm I can't predict the future.
And one more thing is like talking about being early like um people don't think
about this but like the same structure of a 104 is actually good for embodied
agents as well. >> So like uh when we have more robots like they can use exactly
the same structure and accumulate exactly same reputation uh exploit the
security primitives. So yeah maybe three four years down the line but uh that's
also an exciting like u development.

[40:18] >> Okay I think we can make one last question. Do we have one last
question? >> Oh, there. >> Very nice panel. Uh, I have a question for David. So,
David, I work with Kite AI. You might have heard the name. I'm the head of Kite
A.I. Kite Chain. So, I'm the head of protocol. Uh one thing that I wanted to
speak to you about in person but also in this larger setting is I was part of
the near intense team building solver architecture adding you know multiple
wallets uh trying to be more inclusive about people not using drone sitting idle
the same with doge we saw the same with XRP uh I think we have a huge
opportunity to replicate the same intent abstraction with 8004 before and that
is something that we would really like to contribute towards. U one of course we
want our chain to be successful and second as a web3 purist I would also like to
contribute on the research experimentation contribution in an open-source way.
So what are the different opportunities there or how do you collaborate
currently because I've

[41:30] spoken to a couple of Ethereum Foundation folks back in the day. It has
gone to a certain stage but then it always stopped after after a while. So I
would like to understand what is it that you have in mind for the next 3 to 6
months. What are the learnings that I could bring from my near experience of
near intents which I think is a very uh similar setup and try to really make
this intent abstraction gas uh uh guest sponsorship not only for web 3. I think
this we can really tap into the web two world with this uh new narrative
of 8004. I'm very bullish on the bullish on this. >> Yeah. Yeah. So the question
is about like um uh there's been like quite um a mass of work like in web3
ethereum or like near in this case around like uh uh in intent uh protocols and
like solvers etc. And the question is like how does this relate to 804 so um the
reality is like right now this is outside 804. So like the way you should think
about like 804 X42 these protocols is like essentially like ground zero like
agent Z ground zero of like the agentic uh economy. So these are like very

[42:43] foundational protocols and we need like more protocols on top that then
can plug into these like very thin like registries. So like u some around
validation and TDS intense like specific like negotiation protocol for commerce
is another one. So like I think what will happen over the next few months and to
some extent has already been happening is like new like EIP or ERC will be
proposed. Uh intents could be one of them. Um a lot of like offchain
infrastructure that allows you to like interact with the foundational protocols
will is also being built. Uh and to be honest like after we go mainet uh in a
few weeks that will be the main focus of our community on the infraite because
uh yeah we need more agents but we also need to make the platforms more uh
usable. So this will be the focus of the next few months. So yeah I'm excited
about like your experience. I think you can bring a lot to our community. So,
uh, please talk to us.

[43:46] >> If I can add something, not everything need to be a standard, right?
So, we also have on top of that just specific specs and that's totally fine. I
understand that PRC are cool, but >> offchain tooling like like some
offchain. >> So, unisop interface smart contract are not an ERC and they're used
by like lots of people every minute. So, that's >> next year we'll be sitting
here and you'll say stop building reputation platforms, build a reputation
mechanism. Okay, that's that's a good uh final word. Thank you so much Marco and
Quint for uh Quintus for enlightening us and yeah, give big applause. Thanks
very much. Thanks.
