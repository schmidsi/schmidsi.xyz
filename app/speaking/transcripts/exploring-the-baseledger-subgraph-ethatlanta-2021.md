---
source: YouTube auto-generated captions
uploaded: 2021-10-07
duration: 1595
---

[00:07] hello oh it works um yeah i think we can get started hello everybody my
name is um simon emmanuel schmidt i work as a solutions engineer for the company
called edge and node we are the team behind the graph the original team uh in in
the meantime other teams have joined uh namely streaming fast and figment so it
is kind of like already the the development of the graph is kind of
decentralizing at the moment so um today i want to explore the possibility to
write sub graphs for basic base ledger so what's possible currently but um
before we dive into the base ledger subgraph i want to quickly uh tell you about
what is the graph by itself um so on our website it's called apis for a vibrant
decentralized future kind of this is the buzzword the marketing speech
technically it is an indexing protocol for creating networks like ethereum ipfs

[01:22] and actually also a lot of others so currently we are like the graph
supports um different evm compatible chains like polygon arbitrary optimism
binance and so on so forth phantom and um more like even non-evm compatible
chains are in the making also we are looking at other storage solutions than
ipfs um like because this is a little bit the enterprise iit thing here i heard
um i want to want to quickly kind of show you in this um in this setup like how
is a application commonly structured so on the top we have the presentation
layer that's usually the ui then we have kind of an indexing layer that prepares
the data then we have a business logic layer where you kind of have the business
logic or how your application should work and what are the rules and then you
have a data layer where all the data is stored and on on the bottom you have
kind of a network layer where um the applications talk to each other or kind of
if you have it on your computer or on the server usually there is some

[02:35] chat between computers so in a traditional application architecture we
see that the top layers they are centralized or even locked so let's say when
you are browsing facebook then facebook owns the ui your data the business not
chicken and everything else the only thing that facebook doesn't really own is
like the network layer because the this is the internet and it's on top of open
protocols like http and iptp you probably know but the problem is like the data
inside of facebook doesn't belong to you and if they go out of business then
maybe all the relationships that you created in facebook are just gone also then
the ethereum and web3 space came actually to challenge the status quo and came
with this initialized like decentralized application architecture like also this
word dap comes from decentralized application so the idea there is like that
even the presentation layer but also the business logic layer which in ethereum
speak are just smart contracts and also the data layer are

[03:49] decentralized again so kind of the data ownership shifts completely away
from central entities to the users or to to the networks the problem that we saw
in in this special architecture is like to query data from from the business
logic layer and the data layer was very slow um for example like uh when you
when you want to see uni swap uh the the trading histories of a certain pair
then um usually you need to need to look look through the blockchain like
transaction price transaction and find the trades and then you can kind of build
your candlesticks or whatever whatever chart you want and this is actually uh
where where the graph jumps in like this is the web 3 architecture that we are
building currently so you have a presentation on layer that can be still
centralized or not but it can be especially what's important it can be changed
so for example if you own nfts then it doesn't matter if you look at them on
openc or on foundation or on show time or whatever future cool nft app will come
because you own the private keys to your um address and all the data is kind of
publicly available

[05:04] and we see like the graph really is that this indexing layer point with
the business logic layer we have like ethereum but other chains coming like near
solana and also a base ledger somehow can be at this uh business logic layer and
then with data layer we have ipfs and rv that we are looking at and and others
that that we we plan to integrate and on the bottom again we have still the in
the networking layer because even we still build on top of tcp and https um so a
little bit a marketing slide so currently the graph is pa is delivering one
billion queries per day um this is this is a number from our from the hosted
service which is currently a centralized thing run by edge node but we are
planning to maybe launch the decentralized network in june and since then it's
possible to have like sub graphs deployed on a decentralized network in a truly
decentralized way as i said like key key applications or key depths building on
top of the graph like uniswap enzyme

[06:17] art blocks boomer protocol um and sushi swap and and and more so like
there's if in most big big depths i actually on ethereum they build on top of
the graph so it's i think it's a it's a core infrastructure um as i said in june
we launched this decentralized indexing network protocol i don't go very deep
into it but roughly the idea is that you have like different players you have
curators indexers delegators developers and consumers which all kind of are
incentivized through the network together to work together in a decentralized
way to have this unstoppable network of data if you want to i'm here for the
whole weekend and if you want to dive deeper into the network economics of the
graph i'm happy to give a quick primer or when we have time after the
presentation um so the next thing that i want to look at is like a base letter
sub graph because um like the graph natively doesn't support base ledger yet but
um because the base ledger wants to integrate or can integrate with um

[07:30] ethereum it is possible to to see what's going on there but first i
quickly uh introduce you to the concept of a sub graph so sub graph by itself is
basically a database schema definition as you see the database icon with the
dots it's not actually a database it's just a definition plus an instruction set
how you can watch the blockchain for events or calls or other things and then
take this out transform it in a way so that you can put it back to that database
um in a way so that it is available for your depths to query fast so it's more
or less kind of making extracting the different protocols from from the ethereum
blockchain and and store what's important about them in a database for for quick
retrieval and the subgraph by itself this destruction instruction set will then
be sent to indexers and then they start to execute that instruction set and
index the sub graph um this is quite heavy so some subgraphs like if if you do
have a lot of events a lot of going on this can take several days um although we
are really working on on making the indexing speed more faster um

[08:45] so this is something to improve but just to say i mean like it is for an
indexer it's kind of an investment which is upgrade to index but looking at um
now in our base ledger we can we can talk a little bit about the concept of a
bridge so like every every other chain or every other system that kind of
interacts with with ethereum at some point there is a bridge like even even like
if you have a centralized exchange like kraken or coinbase at some point they
will send ethereum to the ethereum chain and that happens with some with an
address and with the graph we can watch these bridges and see what's going on
and there are like not so complicated bridges like like exchanges where you just
see tokens and ether flowing in and out but there are more complex bridges for
the upcoming or for the layer twos where there's actually computation that you
can watch on the ethereum main chain and then make meaning out of this and kind
of track what's going on in that bridge and this uh is actually what we tried to
do here so um i prepared a little bit of live coding i hope it works and holds
because um it's

[09:58] more fun if we actually see it going you can see let me know when sorry
oh yeah sure hello do you still hear me okay ah for those who want to follow
this live coding there's this qr code that links to a github repo which is the
thing that i also use here so it is this one so um as a first step you probably
need to have um the graph cli installed so you see this here i did this already
but now the next thing we can do we can say okay we are interested in this
contract so this is the staking contract for base ledger on drops then so we can
click here and also see what's going on like there are transactions on this
contract we can also read the contract here yes

[11:10] so the next step i can just say i want to create a new subgraph and
initialize it i use the host service because robstone is not supported on the
decentralized network yet otherwise we could use studio but now we use the host
service then we can say which contract which network then also here this index
events is actually going into the api and looking at the events and start to
automatically generate code that indexes those events and then we can also give
a contract name let's see what happens so okay so the subgraph name will be like
base lecture subgraph oh i forgot one step first we need to go to the graph
website and create the subgraph because we are in using the the legacy explorer
the way to go there is to click to click here on the graph explorer and

[12:25] then here is kind of a very hidden link to the legacy explorer let me go
there and then we have we are on the legacy system that still supports robs them
on the top right if you're not logged in there's kind of a login with github i
can just click here and and uh yeah and go to my dashboard and then i can click
here and create a new sub graph i'm going to say base lecture sub graph can have
an account if you have teams you can head it here and also what's nice is if you
actually add your github url so people who look at your subgraph later on they
can also check the source that's it so now i already have like created the
subgraph on um in the explorer but now i just need to actually deploy to it so
the thing here is like this is kind of my subcraft name it's kind of my github
handle slash the slogified name that i brought before so this is what actually
they asking me to enter here so the subgraph name is this uh yes

[13:40] okay and then it asks me like a director to create in i take this base
lecture subgraph sounds nice then i do robsten contract address i gave before
the contract name also i gave before that's how it knows and then it goes it
starts to um to clone everything and go into it and install the pencils with
yarn we don't need to wait for your arm we can just go into there and start to
exp to inspect the code so what we have is um this is a standard repository
comes off out of a boilerplate so when you inspect the subgraph the first thing
that i look at is the subgraph yaml file so what we what we here have kind of
the rough definition so we say like okay where is the database schema

[14:53] and where do i get data in so here we have like it's from ethereum it's
on robson the name is taking there is the address and also here i have the
entities which come from the schema and then where the api is it also has
downloaded the api from etherscan and then already some event handlers so we see
like okay this contract emits deposit ownership transferred and withdraw events
they are already already created for for us which is cool um yeah we can also
look at the schema it's also automatically generated because we're indexing
events so this is actually not the graphql schema it's a database schema that
confuses a lot of first-time subgraph developers but um we have like entities
which are tables so we have like a deposit entity like for every event we can
kind of have an entity so far it's quite straightforward but um uh yeah we see
like there's everything has an id there is beneficiaries or and there's an
amount so like it's taking contract you put some money in and you just withdraw
money and third thing that's created is kind of the mapping file where we have
like these these files this is actually not typescript it's a sample script so
it's

[16:06] a little bit different but we have these files um these functions that
that do what they what they should i mean it's pretty straightforward so handle
deposit gets a deposit event creates a deposit entity fills the data and just
saves it that's it but what is cool is that we can run this already um one thing
that is not auto generated is start block so you can easily get the start block
from when you look at the address and you see at which transaction the contract
was created then you can follow the contract address and get the block number
out because i mean it doesn't make sense to start with block zero when you know
like the the contract was deployed at this block 10 million so that's what we do
we go to the subgroup yml and add the start block start block okay now we save
and then actually the next step is simply um yarn so now here i think it's
installed that's cool so we can yarn build or yarn code again this generates um

[17:28] some helper functions so we have kind of this intelligent uh thing in
the id where we can start to inspect the the objects and then we can do yarn
build to check if the build process works and uh this works so i can just deploy
the deploy script here run comes from here everything predefined also what i did
before that you see in the github repo is at some point you need to authenticate
yourself um you see it here this is my access token um no worries i will kind of
create a new one later but uh you can um you can find it there and then you do
you need to authenticate yourself so that this works but other than that i
already deployed like my minimized base lecture subgraph um like it's more or
less the boilerplate to the host service actually i can just restart here and
then we see it starts it's already indexing we have to have the query here and
we can run the query and interestingly it already sees some deposits and so my
ownership transfers

[18:40] cool right i mean like this this was like um yeah 10 minutes and we
already have kind of a first sub graph but now i think this is too easy i mean
we just indexed events um and that that doesn't make it interesting so when we
look at the contract um we can look at the contract here we know uh it's kind of
what happening here it's it's there there's there are deposits there are
withdrawals but what's actually interesting is i don't want to see just a
deposit with troubles i want to see like i can want to query for an address and
see like how many deposits has this address and i know how many stake is it
there so can we add to it when we see deposits and we subtract from it when
there are with troubles so let's explore that um for this we create a new entity
called account um and that we do in the schema and then we can also link the
account to to these addresses here i have to say i

[19:52] cheat now a little bit because i prepared everything there's quite some
changes here we can walk through them oops all right okay so what i did is like
i removed um i removed the handle ownership because it's not so interesting i
mean like it's just like uh the con the contract is owned by someone then it can
can change we don't care we care about the deposits with troubles so we can also
uh delete that function and then also we created this account entity and started
to link it so we link it here so i said the sender is not like just bytes
anymore now it's it's actually an account and the beneficiary is not just bytes
also there is there is actually an account so we can save that and then we can
also see how the subgroup yml changes it's a little bit bigger um yeah so i i
removed this handle ownership changed but otherwise more or

[21:04] less the same and then the last step would be the mapping can also get
this okay so this new mapping file actually i cr here i created a helper
function that that says it basically says like okay either we need to create a
new address or account in our database and then i create it or it's already
there then i just just keep it back and then here i say okay and when i create
the new one i start with stake zero that's it and then especially the handle
deposit we can quickly look through so again we create this deposit and entity
and also here the beneficiary i say like okay so either it's its first deposit
then we need to create the account order it's already there but what i
definitely do is like i take the staked so we have a stake value on the
beneficiary

[22:15] and we just add the amounts taken with this transaction and then we save
and also with the entity i created i renamed it a little bit so it's centered so
now you see oh okay so this type doesn't exist when you see stuff like this
usually your code gen code then resolves the problem because i changed the
schema and because i changed the schema that these auto generated helper files
here see these are in generated they changed and then we had like type problems
but now if you're on typegen um code gen i have them resolved and actually
handled withdrawal is more or less straightforward so we saw this and then you
can just say okay like check does it build then we can just deploy again and
here we check like

[23:31] what's going on was it deployed not arrived yet now when you deploy a
new version first it goes in depending here so you also have like you always
have kind of the version from before that's around it's the current version up
to the point that your newly deployed version actually syncs up it should sync
up fairly quickly but while we're waiting i can show you another trick so um
unfortunately this playground here i mean it's cool you can can do first things
but it has some limitations so i usually use this graphical online to go
directly into uh to have a little bit more full-fledged graphql explorer so here
for example we can say okay i want to see the accounts i want to see the id and
how much it's take you can also do skip or word or whatever and you can click
your queries together so if you're not very familiar with with graphql or just
lazy this is a very good good tool to to to build your queries um so now we see
uh this there's just one staker and it stayed

[24:47] i don't know what this probably 0.1 ether did you just send it okay cool
do you want to send another one so now he can he can send now a new transaction
or kind of can stake more and then the subgraph will kind of index this after
after after it saw the block and then we should be able to create this um there
it is so a sub graph helps you to easily uh kind of look at certain things on
the blockchain be that we need a complex default application or being at the
bridge to another system like the base ledger it is an easy way for you to kind
of make meaning out of the data from the blockchain and have it have it read in
this convenient graphql interface that you can query yeah i think let me check
the slides are also here so for if if i go i was maybe nervous so i just created
these but in the end you can look through them and yeah that's it thank you so
much as i said i'm around the whole weekend

[26:07] so if you have if you want to use the graph for your project and you
have ideas i'm here you can brainstorm whatever yeah thanks for having me all
right so that's uh that's a wrap for this first session
