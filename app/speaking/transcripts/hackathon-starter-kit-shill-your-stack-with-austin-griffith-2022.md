---
source: YouTube auto-generated captions
uploaded: 2022-11-23
duration: 1633
---

[00:01] what's up I'm Austin Griffith I'm here with Simone from the graph and
we're checking out a starter kit uh let's let's dive right into it right let's
get these containers up and running but it's a it's kind of like a ethereum Dev
starter kit right with with kind of graph powered is that how you would explain
it exactly yeah it's uh it's it's it's playing around with all the technologies
that the graph has it's uh you know running a graph no locally deploying a sub
graph but then also using the guilds graph client to to query that and and even
we can even look into how to extend then the the client side uh graphql schema
which is quite exciting in my opinion and uh thanks for having me yeah heck yeah
and and this is right up my alley because it's it's similar to scaffold eth I've
already seen how you were doing some pnpn stuff and bringing in multiple
workspaces and but but we were also saying that you have Docker and being able
to have Docker means that you can have all this stuff containerized and so many
other things can come up like you you could be running an RPC node or a block
Explorer or something there's so many neat things you can do with with Docker so
yeah take us away exactly so here's the here's the repo I'll put this repo in
the show

[01:13] notes also yeah yeah hackathon starter kit awesome all right cool so I
have it already here cloned um so basically what you need to do is just pnpm
which is the new kid on the Block next to yarn and npm right and death which
spins up a local hard hat node um so you can deploy your contracts a local graph
node together with a postgres database and ipfs and um yeah that's it and so you
can just get started you can think about to extend this actually with um with
also having next chest and run directly in this Docker composer into your web
server or whatever yeah your Dev server yep or or like I said really like a
block Explorer if you wanted like a local like tenderly or something like that
yeah a lot of cool stuff could go in here yep yeah I looked at uh there is this
one open source what's the name uh black Scout maybe yes I I'd love to see a
block Scout Docker container I tried to make one a long time like two two years
ago but I bet there's something better out now sorry to interrupt no

[02:25] worries uh because yeah I I was looking at blog Scout um and tried to
run it as a Docker container but I mean I invested 10 minutes and then yeah I
made a documentator for black Scout like so many years ago but I'm sure it
doesn't work anymore I would love to see one now let's put that on my list all
right so the next comment just to to have um a quick start is pnpm Quick Start
um which basically deploys the contracts that we have to the local graphite node
and then deploys the sub graph to the local graph node and mins one transaction
in this example I use nfts because nfts are cool and everybody understands
what's going on so it depends in an ft contract also and then calls a mint
function on the nft contract is that right exactly and so we've I mean like how
long are we in here now one minute so in one minute you have a fully local
development environment powered by the graph and um and local hard hat nodes and
then you already see I have the mints right um so I can so the cool thing about
the graphql Explorer that's now baked into

[03:38] the graph node is that we have on the left side uh the Explorer so we
can explore what entities are here and start to you know just go in and click
some stuff and see what's what's coming out and what about what about like
tinkering on the smart contract like as would you add something to the smart
contract and then redeploy and kind of get into this Loop where now you then you
go Tinker with the the front end yeah let's let's look at the Smart contract
here yeah that's a cool question awesome super simple um you can say yeah let's
throw a new event in love this let's just have a new event which is mainly I
mean uh emit I mean all right um so that's now here comes the idea of so-called
um no code subgraphs a lot of people are afraid of sub graphs because uh when
you get started with development web3 I mean most people maybe already know a
little bit JavaScript and stuff but then first like solidity what is it and um
and then you you end up maybe you have your contract somehow working and then
people tell you like yeah but you

[04:50] need to use the graph and then you look at the graph it's like assembly
script like oh what is this and all the concepts with the webassembling code
stuff and like a scheme and it's just like whoa so that's why I think the idea
of the no code subgraph and I'll show you how this goes I need to work on this
so basically we can just delete the subgraph folder and but then I need a small
trick now I think I need to just restore the networks I can fix that but just
when I do now again uh pnpm Quick Start I hope it works uh rebuilds it based on
so it's going to compile and deploy the contract and then give you uh an ABI yes
a subgraph is recreated but I need to do another quick cheat here which is uh
reset this I like this this is a raw like you're still like kind of just getting
the the starter kit together and try and finalizing how it's gonna work this is
cool yeah it's very early but I was like

[06:03] yeah I need to go out like I need to talk with people about it maybe
yeah yeah I can motivate people to help I mean I'm not full-time working on this
so um yeah okay let's try again so second try so the problem is um the auto
generation it has some assumptions which are different and but we can iron this
out it goes about the idea so I just recreate um oh my God ah I need to go and
do this get an installation let's try a third time it's uh this is one of the
best parts of the shield your stack sessions when someone comes on is the raw
when something doesn't work and how we troubleshoot through it give people you
know other developers that are watching some context about what to expect and
how to get you know how to get better at this stuff awesome so our sub graph is
up now because in the talks it always works right right right if it works 100 of
the time it's not yeah yeah it's not real life

[07:14] all right now I see we added the mints yeah we see here also I need to
uh and we see the transfers I mean it's it's the same but now as adaptive
developer I don't need to care about the subgraph when the tooling is ironed out
then whatever we do in the in the contract you just say like boom create me a
new sub graph and you don't need two characters here it's here for you and then
so this would translate over to your front end or something you would kind of
iron out what you want your query to look like what kind of data you want in the
state of your front end you would craft it up here in the visual Builder and
then it would basically give you a query that you could copy and paste into your
front end and then you'll have all this information cool so you would do
something like I've already prepared it so we do something like there is also
front and folder right and um and this is where you're using xjs or something
like that yeah exactly aircraft mind um let's look first at the magic and and
then explain what's behind okay for sure that's the way to go so what you need
to do here uh I need to achieve quickly

[08:27] yeah I need to build the graph client first so the cloud the graph
client is built by The Guild um it is a kind of client-side graphql magic thing
that can stitch schemas together so you can use it to query multiple sub graphs
at the same time Sushi uses that now in in the new front end but like a lot of
there are a lot of projects are cross-chain so that's one use case for the graph
client but there is also more beauty that I want to explore today um that we can
do what we need to do is to just build the graph client and then you can run
pnpm death it's just the next project um some air warnings whatever the scaffold
it at any given time has so many warnings in it awesome we've got a front end
yeah and we see here um we already have uh we see the mint right the first one
now the first thing that's cool in my opinion is when we do um the npm mint if
you just meet the new one the events are coming in yeah so why

[09:44] does this happen there's a new feature that the guild is currently
working on it's called the live queries um live queers if you're familiar with
graphql it's just like you tell them like hey this story is actually live so
whenever the underlying data changes I want to have my front end updated um this
is the specification that will roll out into the graph node eventually they're
working on it but the graph client already exists so the cool thing is with the
graph client we can try out new features that that there are in development
before they actually land in the graph node so it's it's kind of a sandbox a
playground um yeah and and that's it I mean we can have so what you would do is
you have to query from before um we don't necessarily need the block number it
should not be name transfers and then you can uh you can work on your query here
um yes but I want to also look into one thing and that's where uh when where the
custom resolves the custom front-end resolvers come into play and this is

[10:56] where I think like most of the front-ends currently use hooks right we
transition from Redux to hook um which is not a load of RPC calls yes yeah and
and it also it also think I think it makes the front-end a mess eventually
because you have all these hooks they are lying around they don't know how
they're going to depend with each other like when is the data actually uh
requests then we're not and then uh in my opinion it for for complex application
you start to get into Troublesome um so obviously I can just log in here with my
metamask and then it gets my address out but let's see under the hood how this
works um so you have I have here an account query that I have anything like I
can query for ethereum and account um and this is this actually is possible
through client-side schemas teaching and client-side resolvers I explained this
quickly how this works so you can say I have a schema and uh and I start to
extend it and here I think also we go already into the

[12:10] direction of uh multiple rise in the front end so with scaffolding maybe
2.0 maybe at some point you think about like hey we want to have easy more easy
Plug and Play modules that come in that are in itself in independent do not have
like much of requirements to the to the like parent module that requests it um
but still have everything you need and that's where where this this pattern
comes in so you can say like I actually want to extend the schema and I want to
add the mutation and that and then you can Define the mutation type so there is
a connect so we were able to run a connect mutation we can look at this in so so
in the graph schema or in the graph config we're kind of configuring or setting
up what our front-end State needs to be or some kind of front-end uh state with
with mutations exactly you're you're setting that kind of schema up in your
config and instead of using a bunch of hooks to pull kind of independently
there's it's kind of this hitting this middleware layer and keeping that state
populated live exactly in uh in a modern non-decentris application what you

[13:27] usually have is a one graphical server that serves you everything that
you need and it has mutation subscriptions and and queries inside um but
obviously with depths we do not have a server the graph kind of wants to be that
server uh eventually but currently it it doesn't work for everything especially
mutations or account level stuff obviously the does the graph nothing know
nothing about so we we can already start to use the same magic so we think like
this what we've what we previously would have as a server running in the server
we just move it into the client but then the layer stays abstracted from the
from the from the user interface so we kind of have a mini server in the front
end um that is uh is problem playable um so it's so you're running a container
locally that will basically represent what the graph will be in a decentralized
form eventually is that is that the same thing okay yeah cool yeah but you can
also enhance it with whatever you want so we had we saw so for example the
connect it goes to use mutation use mutation is the standard from you your call
is the same if Apollo I can go into the connect

[14:41] or actually that's Auto generated um so we see the mutations here so
it's just like very small it's it's very small like the connect mutation it's
not nothing big but when I'm running it then it goes through that mutation it
will go in here see like hey here we have this connect mutation it's actually
here and then also we have additional resolvers and everybody that already
brought the graphical server knows what resolvers are it's the code that runs
when you when you query a field in your in your graphql schema and that's cool
so we have resolvers here and we can look into the connect resolver which is
really simple doing uh ethers get the provider request account then just sets it
that's it like it's not super super crazy and on the other hand side we have the
that's the mutation so we have the query which extends ethereum I think that
could be uh nicer but uh I don't know I need to work on this but in the end you
have accounts so if you if you run the

[15:53] account query here it will go in here and does like again with ethers
but we know like try to get the address if it has the address it turns address
if not then returns undefined um so we could think about extending this in in a
a lot of ways right we could say like for account you have your C20 balances for
you have nft balances you have uh maybe you want to have uh ether balances you
want to maybe probably see your recent transactions like there's a lot of things
you're using hooks for yeah just look at like the wag me hooks library or eat
hooks in scaffolding all of those hooks you you'd code in here basically and
have it part of this kind of resolver thing but what you end up with is like a
very nice separation of concerns so you can have a you have a front-end that is
not concerned about the data loading data where is it coming from all the race
conditions that you run into all and also it would be extendable so you could
say like okay I wanna I wanna load um yeah let's say I want to load the year c21
that would look something like uh very ethereum yeah ethereum account

[17:05] string then it would be something like erc20 you write just here that
will be uh number and then you write the resolver that is here that would be
let's see 20 blah blah I don't I don't I don't want to like create a contract
object and do a read on the contract object to get the value or something like
that or you can or you can bake in another subgraph okay yep so for the nfts you
could query the nft holding sub graph um and that is all abstracted away from
the from the actual front-end or UI engineer that just interacts with the
graphical schema now it gets even a bit better that however our schema actually
looks we need to stop this um so maybe it's a bit hard to wrap your head around
like what what what is loaded how is this schema now extended or not and if that
helps so we have this graph client serve command and that could also run if if I
would

[18:19] like work more on the docker compose file that could also run separately
from the from the front end so you would have it already up and running but um
yeah it's working progress so the cool thing is um the graph client the def the
development um what's the name development surf Dev it um exposes to everything
here again and see compared to this one I only have meta here that's the one
directly on the graph node but this is the extended so I see ethereum and
because we added erc20 before it also has a fake I don't think we have this
stuff in there yeah exactly okay so as you add those things in here they show up
in your in your query toolbox cool and see this is now server side generated
this is why Windows not defined but it's okay I mean like it's good enough for
me to to explore the schema and however it is set up and and to get the query
out and then bring it over to the front and build on top of it we I talked a lot
about forkability of projects where yes you're building a cool project and it's
open source but how forkable is it could someone take it

[19:31] and make a small change to it with the separation of concerns here where
you have your state loading in one kind of Silo and then you have your state
display and another if someone doesn't like the way it looks they could Fork
this really easily and have the same state and just change the way it looks
without having to deal with like you said the race conditions of all the
different hooks that have to get all that different data from all the different
places at once and then wait for it yeah so is there a longer wait time like
like knowing that if I was thinking okay so there's imagine there's a layer of
abstraction on top of all of these Hooks and you're getting all this information
are you kind of waiting for the weakest link like is it still fast like I guess
is my question in the middle yeah that's the beauty about graphql that you only
you only trigger the resolvers that you are actually triggering so when I when I
now just like when I'm just here for example check for the current block number
and hash whatever I get them and the code inside of the account is never run um
so graphical actually is in that regard in my opinion very well suited for
exactly this that you that when you write your like obviously you can over

[20:44] Fetch and you can with every query you can send this in this actually
can get dangerous because account might be slow and if you always query it
despite actually needing it yeah but the optimization is easy do not over fetch
um yeah that's it then you have so let's say we built a little token or nft uh
we set up a little front end that lets you mint it and maybe we displayed all
the different myths uh and we've got it on on localhost working maybe we deploy
it to a test net for a little bit but what's the what what happens here in terms
of going to production or in terms of like getting it out there for someone else
to play around with once you have it all locally there's a lot of containers in
infra we have up how do you move that to the cloud or whatever or move that to
being backed by a real sub graph or whatever Ah that's a good question so um so
for the contracts it's hard hat so what do you purchase yeah you go in here and
you add your chains that you want to deploy um so that's the easy part the
subgraph is also I mean quite straightforward I mean I could just now go to you
know uh

[21:58] like assuming we are using girly I can go to subgroup Studio okay you
would take that query from your front end that you figured out and you'd put it
into subgraph Studio or some uh web app and that would let you create there we
go okay cool I do girly this is my nft or some nft or something like that yeah
nft then it's available well my nft cool continue and then it's uh this one boom
cool yeah you authorized your CLI and then you run something in your CLI that
deploys it up to the the this back end or whatever this graph node or whatever
the graph subcraft Studio yeah studio um so yeah there's any there's some
front-end steps that you need to do up but I mean same would be with the front
end right right and if it's next.js you're going to build and deploy some static
app to versl or wherever you're deploying to so there's there's there's

[23:12] hard hat and the so the local environment comes with a handful of things
but it starts with probably hard hat and that's where you're deploying and
you're getting artifacts from that and there's another container that's like a
sub graph and your artifacts are object injected into that and then is there and
then there's so and then there's all the way kind of to the front end there's
the next JS stuff and the next JS could be deployed to the web what's the is
there what's the middle part is there another container in the middle there for
that's it it's just next CIF Dev server the subgraph server and the uh hard hat
node and those are basically your main pieces and each one of those if you're
familiar with them it's just the steps you're just kind of wiring them all
together as kind of a coherent starter kit here exactly I mean cool there are
two ways so like the graph client can be also statically built so I mean like
I'm a decentralization maximalist or and eventual decentralization maximum yes I
I understand that's not always possible right now but um still like that that's
for me a guiding principle like it should always be possible or or we should
always try to go to go in there

[24:24] go in that direction so if graph client um the thing is that it can be
built directly in your static static build and like your whole front-end can
just be uploaded to ipfs that's it right so um but if you if you really want to
you can also deploy some sort of of server or or Cloud middleware caching kind
of or server host yeah yeah if you want but I don't see like a big Advantage out
of it because because like the real magic happens when you run the graph the the
graphql stuff in the front and because then you have access to metamask or to
inject the provider and and you could build much more out of it then if you
would put it into a cloud flare about everything then it will have access to
that and that's actually no no real additional value in my opinion um yeah and
then yeah that's an extra part here is the sub graph stuff is pushed to the
front end where the wallet is and and other things that you're going to be
interfacing with exactly interesting cool awesome and for people to get started
they basically go to the repo and start forking it there were some magic steps
that you did along the way that I'm guessing will slowly be kind of ironed out
as you finish this

[25:37] off but is this is this the place to go oh cool this is a good looking
repo you know and it's easy so yeah so so this works the quick start and you
already have like uh the contracts of running the graph node local hardware node
that should more or less work I heard that like you need to be careful that you
really use the latest pnpm version there are some additional steps maybe I
should implement this um yeah but but then you can follow these steps and yeah I
mean like I'm open for issues pull requests um ideas anything I mean as I said
like I do not have like of a lot of time to work on this it's more like a little
bit of a pet project you know also play around with the graph if the latest
graph not releases like this graph client releases so there is like this
intrinsic motivation or like but I think these are patterns that might emerge at
some point into into the the next wave of of tap architecture or hopefully or I
don't know maybe I can Inspire some people yeah exactly that's what you just
have

[26:49] to kind of like build a few things with it and show it off I think and
that's what that's what we're kind of doing here and let's see let's see if more
people extend it I'll I'll put a link to this in the this video too so if people
find this kind of YouTube searching they'll get a good link to the GitHub and
start building thanks Simone for showing it off that's really awesome yeah
thanks for showing off man yeah see you
