---
source: YouTube auto-generated captions
uploaded: 2024-11-19
duration: 4607
from: 2166
---

[36:03] um my name is Simon do you still hear me yes okay cool uh yes so um
thank you Rob so the idea of zero to De as I said like it's kind of building up
so um foundational usually is to learn about smart contracts and uh yeah when
you go into adapt development but uh then we can have building blocks uh going
on top like um I'm working on the graph protocol so the building block that I
think is the next is um using the graph to index that data from the blockchain
so um we can quickly run that uh thank you rob again uh through some slides um
that explains like how to access it but I want to emphasize here like in the
zero to depth context like the H having the graph is one idea it could be other
uh other things that get data into your front end or other protocols that you
can can uh build on top like we had zero to deps um setups where like L after
after the graph maybe T tenderly came to present or we had like polygon that

[37:16] showed how it works on their chain um may we also worked with wallets
and so on so forth so like that's basically open the idea is just like that we
run through in one course and that each session Builds on top of each other so
that people that really take the time sit in um that they yeah and end up with
something that is working and also to Showcase how nicely actually all these
different protocols and projects play together because um uh yeah we kind of
from the same chain and have this interoperability the the Lego blocks um I
think it's very nice anyways um so as I said like my name is Simon uh I dooper
experience at ETO it's one of the C working on the ground quickly uh who knows
what the graph does okay yeah I I can run through the slides like basically it's
about accessing blockchain data um so when we think about data on the blockchain
when we send a transaction we always pay gas uh to incentivize the validators to
bring that transaction into the chain uh so like that's that's why people run
validators because they can get part of that Gess or actually they get block
rewards but you know know what I'm

[38:30] talking about but like when you want to um read data from the blockchain
I mean there is a interface called Json RPC that helps to get data directly out
of of of of the of the blockchain node but it is not an optimized way of getting
data out it's a very lowlevel interface to get data um so that results like in
code like this um that's actually a project that I that ask me at some point
like hey we have problems in our front end it's very very slow what can we do
and when you look through it if you understand JavaScript do understand
JavaScript and typescript good uh yeah then you see that all these await
statements and all these await statements they they it's kind of like they the
frontend code works with Jason RPC endpoint and they wait until the results come
and let say and this is just like in showing nfts and if the person has 10 nfts
that he can easily take like a second or two to load and I mean we are used like
if if if you are uh using uh web 3 or the central applications on everyday basis

[39:45] kind of like no it takes longer always like very long um but like like
the next you know the next wave of people that comes in they will probably like
after a second say like ah this page which probably doesn't work um so we need
to work on this so one of the things that people started to do is um building
their centralized index kind of like setting up servers and server uh in their
server Farms whatever or connecting to service providers that do it for them or
whatever um and build and build that thing and it's okay I mean it works but on
the other hand I like a lot of the properties that we were looking for if they
Center Technologies are a little bit circumvented like that I mean if that
server goes down basically the application is unusable anymore uh it's also a
the single point of censorship like if there's any any problems um then it can
can go down but there's also often a vendor lock in um that uh especially
service providers that provide such a service they they might or might not just
change the service change the API change the pricing or whatever and if if you
build an application on top of something like that uh yeah that can break so
that's basically a little bit where

[41:00] the graph if subgraphs sit um so having like a decentralized network of
indexes that basically care about that problem um they run graph nodes which is
a fully open source MIT stack that you can also run on your own um data center
or local machine to for development but um it is in in a decentralized network
it's there and it's running so you don't need to care if you don't want to um
there over 9,000 subgraphs uh published so basically every big protocol has a
subgraph uh on on the graph Network um so that's pretty cool so it's it's it's a
it's easy way to have like data accessible and then we end up with with this
Paradigm like that the UI sends the transactions directly to the blockchain Via
Jason RPC it's also then the Chason RPC works pretty well and then the subgraph
basically watches those tra watches those contracts see what's going on right in
the store and then the UI can read from the subgraph that's a thing uh the the
graph is uh as I said it's a decentralized network it consists out of uh 110
index across the world the big number of

[42:12] delegators create is not so important as a developer but actually also
subcraft it's almost like a 10K subcraft right now so like uh if you like if you
develop your new contracts usually you write a new subcraft but if you're
interested in just getting data out of what's going on then there might be
already a subgraph that uh gives you that data but in this zero to dep what we
do is like we build a new uh contract uh yeah you can think of subgraphs as
something like this there's this this like huge uh around things of of data on
the blockchain and it's unordered and and we want to bring it in order and so
that's where subgraphs come in or when we go through to the um example from
before like this this uh ugly JavaScript query that we saw or JavaScript code we
can have at graphql but we s just like one transaction and to the to a graph
node or an indexer and then uh we have the the results and it usually takes I
think average response time current is 150 milliseconds so that's uh as Snappy
as we would like to have our applications be yes and the subgraphs are

[43:24] customizable apis so it's code code so they're written in code it's the
code is called assembly script it's similar to typescript it has some quirks but
uh usually it's it's easy learnable and um that whole technology by itself is
like as I said it's it's an industry standard it's open source and while writing
subgraphs uh it's also then able to publish it to that registry the graph
Explorer and so it's it's a little bit of a market plate of data sets or a
collaborative registry of data sets that have blockchain data and if you write a
new contract you can bring your uh subgraph also to that registry um yes so as I
said like there's a graph Explorer to explore subgraphs but we mainly look at uh
the gra.com studio um yes so like like the the in the workshop of Rob who was
actually following and all also deployed an esc20 token right now what's that
someone one two nice two and a half okay

[44:40] so zero to dep workshops usually take uh a day or two and today we do it
in an hour or one hour and a half so usually we are there and say like okay now
you you follow here and click here and you deploy and stuff and then we have a
uh like mentors around that help people to sit down when they're blocked uh
that's like unfortunat we cannot do it here so we run through the theory and
some people might be able to follow some people not um but yeah there will be
the Hecker done on the weekend and I will be there and so you can just try to do
it there but I'll show it how it goes so when I also share the slides in the
telegram group so because I also made screenshots but I tried to just do the the
live demo here so when we go to the gra.com slash studio uh you can sign a
message to log in oh yeah that's my test subgraph but but usually there is um

[45:57] here is a button to create a new one if there isn't any but I can create
one I can give it a name um live Devcon actually the best practice is to give it
a proper name with spaces and capital letters and that stuff and then here you
will see it it created that Slug and then when we have that subra in the subra
studio uh there is basically the instructions here on the right that you could
just follow in order to get started with with a subgraph and it's actually it's
pretty easy so I go in my terminal here I need to make it a little bit bigger so
that's the first command I run I run this so I'm getting the latest graph cign
installed on my local machine

[47:15] um in the meantime I try to verify that token here e here yeah I want to
from the owner actually yeah here ah no okay right thank

[48:29] you it's good to have experts in the room like that's that always helps
okay so I can go over to get the contract address and then the deployer address
was probably I can get the owner here nice okay if so you had that question
right about how to verify an ether scan so we did it so you need to have an API
key add it add it to to remix and then it should work like the quirks are you
need to find the contract address where you deployed it when you do it the first
time um I mean I I I probably spent an hour once to find it again uh and you
need to know the deployment arguments that that you gave uh one of the
workarounds for me is like I started to write contracts without deployment

[49:41] arguments and at all because it's always just a hassle to verify them um
but yeah everybody finds its own ways but now now what what's important for
starting to write the sub graph what I wanted to say is like you need to have uh
a verified contract on ether scan at the moment like we're working on
integrating especially with sourcify since this is this canonical open uh code
uh source code registry but unfortunately as the state is right now uh eil scan
has the most verified contract and so this uh is around but having said that I
think now we should have the latest um graph CI installed that looks good and
then we basically just follow the steps here so we do graph in it uh live Devcon
and that that dialogue is it visible that dialogue um yeah kind of forces forces
us to go through like uh some questions so the first is the protocol so the
graph also supports other blockchains than ethereum but we don't care it's
Defcon

[50:54] only ethereum is important uh then like the subgraph log is um so
ethereum here means evm compatible actually so the subgraph slog we we we we
take it from here see I said like there's this logy thing going on so we it's
lowercase and dashes for spaces um but um it's all automatically then we can get
a directory I usually just go with the one that's there and then we can just
select the chains here and it's like most um evm compatible chains are around we
go for sepolia here we go and now we need to have the contract address again and
since we have it here can get it over and now as you see it fetches the ABI it
fetches the star plock it even fetches the contract name directly from ether
scan so we don't need to do much the star plock also is here my token and then
the last question is like index contract if entities which scaffolds out the
whole subgraph like database schema uh mapping code and everything that just
indexes all the events in my opinion this is

[52:07] already um come on maybe because of the I know it's probably because of
the pointer interesting um where was I so yeah so we have it scaffolded out yeah
now actually I can show you quickly how that looks like while it's installing in
the background so a subgraph basically is just like simple uh node Jazz project
you see there's a package Json file

[53:20] there is uh yeah it's a package file with some commands like there are
some dependencies um but then like what I do when I look at the subgraph I look
at the subgraph yaml this is what everything keeps everything together so it
says uh what we said before um like where is the like which contract which
contract address is it uh where was that contract deployed so we don't need to
look at blocks that are older than the deployment block um on which network are
we which uh like blockchain uh thing do we have is e ethereum or something else
um and more like there there's a whole documentation about what we all have here
but like here I said these are the event handlers and for the contracts or the
esc20 contracts mostly important is the transfer event so with the transfer
event we can basically reconstruct everything because in the transfer event we
see the mints that they go from address zero to some address and then with with
um with an amount and then when when tokens are sent around so that's basically
it but the orders are here depending on the contract that you write uh that's
all scaffold out then there is a database schema so the schema. grq think about
just the database schema for everybody that knows

[54:33] about the database schemas um just table definitions um with uh yeah
just table definitions where where event stuff is stored and again for the
transfer we see there is an ID there's a from it's encoded in bytes which is an
address a two encoded in byes again the value like how much tokens changed hands
and then the block number when it happened the uh the block Tim stamp when it
happened and the transaction as so these basic building blocks already would
would help me to write the front and to just uh displays all the transactions
that happened on that token uh also some code is autogenerated here you see it's
in it's in typescript for those that are able to retype script or JavaScript
it's pretty simple so this is a good starting point I don't even touch any of
that code it's just a boiler plate but I want to to quickly show you how that's
organized uh so that later on you can uh go crazy and do your own stuff if you
want because we ran this thing so then we just go further with copy pasting out
uh the authentication please don't uh steal my API key here I know the session
is recorded So I mean need to

[55:47] change later we did already go into the directory so we don't need to do
this then there is this graph Cod gen and graph build there's some autogenerated
code of the schema and of the manifest like that yl file that we looked there's
some helper code created and uh and then like uh the whole thing in the end is
compiled down into web assembly the good thing about web assembly is that it
gives us a very uh robust sandbox so that the indexes don't need to be afraid of
running your subgraph code uh because like some smart engineer tried to hack
some stuff in so the assembly scpt this really secure uh uh sandbox and then I
can just simply run graph deploy life Devcon that's it I give a version number
so I go with the default and that's it and then I see here in the UI it starts
in the background like uh to Sy um we did not do any transactions

[57:02] yet so we don't see anything see like when you go on ether scam and you
look at transactions it's basically only deployed so it would be a little bit
more interesting if you have any transactions right um so we can go here was it
yeah it's minable right yeah you you create minable so how do we do that so
let's say we mint ourselves some tokens yeah some uh and what happens if I mint
oh ah where do I see the the problem let's see if we just send it does it show

[58:17] here no ah unauthorized account no no I know I be so the owner is Set uh
the owner is set to another account probably the in probably said the owner to
the injected account uh the this one yeah 5B um do we have do we have the
private key of that account is it the normal one from that also scaffold euses I
don't think

[1:00:13] no it's not that I have them okay uh how much time do we have left I
need 2 minutes and then I can fix it or five okay let's do it again e for

[1:02:14] okay I redeployed the contract and now it's pretty simple I just need
to change the address here in the subgraph yl so that it points to the to the to
the new contract and then I can redeploy my subgraph go a version up actually I
would not even have to verify it like this because the subgraph it just needs to
have the ABI of the token here and the the AI didn't change so if you have the
ABI into to contract address then we can we can spin up the subgraph so any
anyways so now we have that um thing deployed here now we have two entities all
right um but we can look for transfers from to Value so let's look

[1:03:36] for transfers so now we don't have any transfers as you see I can go
into the playground and then here on the right I can open and close this graphic
explorer that helps to uh discover the schema um but here now in remix I can
actually send transactions so this this is the new contract so now try again to
Mint myself some tokens now it's working nice boom and we see the tokens here wo
it worked always these live demos makes me sweaty hands okay

[1:04:50] um yeah I'll share these slides later on in the telegram group that we
have if you didn't join the telegram group yet I'll get the QR code up again wow
so many slides today sorry so this is the C code I will share the slides in the
telegram group um what I also have shared in the telegram group is uh Google
Sheets um so what we did what we do usually at this work or like one way to to
run the workshops if if with particip participants in the room is uh to really
walk with through the steps until they each deployed their own erc20 token on
seoa so we have like a shared or like whatever test net you want to work with
and so everybody has that that token and then we ask them to add their eoa or
the address that they use to deploy the token and the contract address into that
Google sheet right and then we have a Google sheet of all the participants that
have uh the the contract deployed and then we tell we can tell them to send now
around tokens to each other and that works right and then each has then a
subcraft that tracks its token and then we can see like uh yeah we can we can
see that the shared state that we

[1:06:03] work on so I added an example uh Google Sheets there if you want you
can um also do that to today or later or I know next week or whatever and ping
me and then we can maybe uh do that but that's that's what we do in a live setup
um also at the telegram group but I will also share the slides later on so you
can um build on top of the slides but I think the last slide of me is yeah the
screenshots of everything um but yeah actually there is also like uh then the
next step usually is now we have a smart contract we have now subcraft is is
building a whole front end or whole UI whole application and for that we
partnered up with scaffold Le scaffold they have a bunch of different um
sessions here workshops I think one runs right now in parallel I really uh can
yeah can suggest to check them out it's a very very cool project but what's
important from from from here is that there is a plugin to to scaffold out the
scaffold e project with a

[1:07:15] subgraph already included so that makes it very easy and then it's
very well integrated uh it's just this one command like basically the normal
command plus a DE d e and then subgraph uh which includes that and they also
work on on other plugins so like there's a a group of plugins or or if you're
working for a protocol that wants to be integrated with scaffold leave like you
can also reach out to them and integrate your stuff too um yeah check it out um
I think that's it from my side if there are any questions we can also do
questions let's see if someone posted a question is question Q are I no okay yes
please to elaborate like web trgs to interact

[1:08:42] with the deploy smart contract now at this level you're introducing
the subgraph so at which level can we place sub graph what is the uh what is
this really useful use for I would like to to really understand why we need it
uh in the process of developing is it for performance or yes Al so yeah I mean
uh the presentation is not that much about like uh showing what the graph is
more about the sca the zero to dep but I can go into it quickly so so yes it is
possible for a UI to directly get data out from the blockchain with Jason RPC
that's possible and that's also so so usually what people learn first when they
go when you go to when you look at scaold uh without the subcraft plugin that's
what what you end up but as I said like here in this problem statement um
getting data out via Jason RPC at scale gets problematic pretty quickly um you
yeah in in so you end up with code like this so you you you send a lot of
asynchronous queries

[1:09:53] to the to the Chas rpcn point trying to get that data out maybe you
get it into your front end then you try to Crunch it together in the front end
and you end up with like slow and complicated code um and then the first step is
usually that you think about like oh maybe I should have my own server and then
have your own database and then you store then you run all that stuff and do
stuff in your database on your server that you run somewhere on AWS or
whatsoever but then you are again basically locked into that system that you
build up on um the where you where you host your service or if you're on AWS
maybe je Jeff Bezos wants to raise prices or whatever or for whatever reion for
whatever reason they do some IP blocking or you know all that stuff that we see
and but with with sub crafts or like there are other indexing Technologies like
the graph uh there is a possibility of spilling on top of stand of Industry
standards that um help you that to to have that data available for your front
end does it answer the question okay thank you please another one yes uh yes
once I deploy the soft the subgraph okay uh is there a possibility

[1:11:07] to know or to to query the event that occur before the deployment of
this subgraph okay which events are you particularly interested in no I just
want to understand and I mean like if you want to for example I can imagine that
you're interested in other contracts events right yes yes then you can uh it's
basically go to this subgraph yaml and then you basically copy paste the whole
data sources here create a new one and then you change that contract address
that start block and then you basically tell the subra hey there is another
contract that I'm interested in maybe you want to look at this um event EV to
okay thank you other questions there is one in the front it's a simple question
what is the difference between subgraph and graph node not graph when we deploy
a subgraph is there a graph no deployed behind yes so the graph Noe is

[1:12:21] um uh as I said like it's a fully open source uh soft technology
written in Rust that runs usually alongside a archive node of ethereum and the
subgraph is a piece of code you can think of that's compiled into web assembly
and then deployed to a graph node and the graph node runs the subgraph and while
running the subgraph it's basically a set of instructions to tell the graph node
what data to get out of the blockchain and how to store it in a database and how
to give access via graphql to other people so the graph node is basically the
run the execution environment for the subgraphs thank you wait wait you you need
the microphone for the recording so how how does the pricing or the fees work
for subgraph do you pay um with some transaction fees every time you make a read
call like the you can run the graph not by yourself as I say it's a it's open
source but if you're using the graph Network there is a paper query oh okay got
it but like it's basically you you you put money into into the system and then

[1:13:33] it detects for you when does um graphs start to make sense like what
scale of data are we talking about it depends I know I personally like to start
with the subcraft immediately it also helps to to write the smart contracts a
little bit more lean because like um in my experience a lot of subcraft uh smart
contract developers they end up writing functions that they you only need them
for data for data access um but you can skip those make your sub smart contracts
a bit more lean and more focused and then and and already start with a with
indexing solution from the from day one um but it also depends a little bit on
on your team I mean I'm as I'm more of a full stack or front developer I was
often looped into teams when that when you have like dedicated smart contract
developers there are solidity people when you talk to them about JavaScript then
uh they become angry and uh and then it's kind of like that setup right and then
for me like then subgraphs are very useful because it's basically a a line of
defense because I can build a subgraph in between the contract and my front end

[1:14:46] and whenever they whatever they do on their contracts it doesn't
necessarily immediately influence my front end work so it also helps with this
um but yeah I would say like maybe if you're really a beginner like if if it's
your first uh smart contract then you might not want to already go into into the
graph although or other Technologies in general although uh with that steps that
I just showed it's also not that hard makes sense and on the flip side if um
let's say you are a pretty pretty old project you have large amount of data on
blockchain already and you want to introduce a subgraph uh how complex that is
complex how simple that is sorry can you repeat the question um uh on a flip
side let's if you're an older project you have large amounts of data already on
the blockchain yes um and it's really slow and you decide to start using
subgraph how difficult or easy it is to integrate subgraph in your project yeah
then that's the same I mean like what I what I just showed like just going
through that initialization steps just having your uh events index is already a
a big plus actually um it's already speeding up stuff and then and from there
you can iterate upon so I think it's basically

[1:16:00] no no-brainer I mean yeah there is some there is it's it's a it's some
learning curve to learn the technology but yeah but integrating is fairly
straightforward okay yeah that was that was very often like the actually the
developer Journey was like oh they come they come and want to keep their systems
lean which I understand usually I also try to have as little dependencies as
possible to start a project but at some point you run into the scale issues and
then TC uh but yeah they could also avoid it and have it from the beginning
about makes sense thank you other questions all right thank you so much thank
you rob for the invitation thank you abna thank you for coming thank you
