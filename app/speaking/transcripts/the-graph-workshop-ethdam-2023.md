---
source: YouTube auto-generated captions
uploaded: 2023-06-06
duration: 1294
---

[00:17] so I just do one that I do regularly actually um so the thing is when we
when we develop some smart contracts and we can do that together it's hard to
get the data out especially at the hackathon so um at the hackathon you probably
at some point um you have like a contract so let's take your c721 oh no and then
we make it that's actually okay mintable maybe and um yes and now I have a token
here and I want to publish that token maybe we can do that everybody can mint
actually that's more fun and then we can just simply deploy that one that token
um to I'm here on sepolia right so we can just deploy that contract to support
here let's do this um while we waiting we can also in the background I think
somehow

[01:32] let's see ah I thought Lexi polio is faster I think we need to have the
flattener installed so there is a flattener plugin all right it's not existing
anymore okay so we have it now deployed so we have like a contract that's that's
created here we see that right and now we can go here and verify that contract I
think it works through um yeah I have the key here and now how do I verify it's
been a while now oh here it's been a while anyways I can just go with the API
actually okay

[02:43] there is always like multiple paths to the goal so but we have a
contract deployed let's um quickly mint token so we also have a token so we can
have a safe mint address to save to myself I mean to myself and token ID less to
zero and then just send this quickly so we have some data on there cool while
we're waiting um The Next Step would be to Simply have a subgraph that now
tracks these transfers so we can go here and go to the graph.com studio let's
schedule maintenance coming up maybe we can do this a little bit smaller and I
can just simply create a sub graph and say like ease thumb the index polia where
is it here then create the subgraph nice and then we can just follow these steps
here on the right I already installed the graph CLI so what I do now is to
adjust to graph init studio if Dom um before we do that I need to download the
API actually here so I have the API to the clipboard I can just quickly do

[04:01] Json just paste it that's it and now we have the Abi and I can start
with graph init go here and just follow these steps so the first question is
like which chain do you want to index so it's ethereum then the sub graphs log
we can just take what is recommended so it's if Dom then the directory I would
say we could just also go with the default one then here we need to check the
chain again so it's polio see these are all the chains that are supported on on
the graph now you can use the polio and the contract address I have it here
right that just deployed so I can copy paste that address or copy and then paste
so the ABI is not found because the contract was not verified on etherscan but
because I just downloaded it and created I can just get that abi.json here then
we need to set the start block the start block is at the Block at the
transaction for the contract creation so I can just quickly get that number
paste and let's give it the name so it's a if Dom and then here is where the
magic happens

[05:13] like we can index the contract events as entities that automatically
generates a subgraph that has all these uh entities index we will see that in a
second here we see on the contract already um that we have we have two
transactions like one is the contract creation one is the first mint now we need
to wait for the dependency to be installed but like we can in the background we
can just quickly look at the code maybe it's done I know that error dependence
is always break I don't know why but we can look at the code I can make it a
little bit bigger I think yeah it's different here than on the others ah

[06:25] zoom in cool so a subgraph basically consists um I first always look at
the yaml that's kind of the subcraft Manifest in the Manifest we see like which
is the address that we want to index uh what's the name of the ABI the ABI then
is found here it's copied over the star block as we just defined in the terminal
and then we have here Auto generated for each um for each event we have a
Handler so we know like on an nft contact we have a proof approval for all
ownership and transfer but transfers are actually ones that are the most
interesting for nfts um and then we have a schema and we see also the schemas
referenced here so the Manifest actually keeps everything together the schema is
here we have uh the schema is basically a database schema it just defines how
how the tables in in the in the subgraph the shape of them and each of them is
also automatically generated so we have like an ID and then for transfer we have
a from address the two address we have a token ID a block number a block
timestamp and

[07:38] a transaction hash so we can go into the mappings and then we see for
example a handle transfer um how this looks so we've received the event and then
it's all generated for us we we just create a new entity we set these fields on
the on the table and then um we save it so the code here that we see it's
written assembly script and not typescript that looks very similar but it is
slightly different but the cool thing is that we can uh also explore what's
going on here so we can jump into into these definitions but first I need to uh
do the code gen yes perfect timing so we can do your yarn code chain which
generates uh that the code for me so like the code chain what it does it looks
at the schema and it looks at the ABI and here write some generated code um
that's cool too so we can see like how these objects are are created and we can
we can explore them and and see what other data we could actually add into the
mappings

[08:51] cool so but we don't need to actually change anything here because like
already by having a subgraph indexing the the events with this Auto generate one
we have already very um cool stuff so we can just authenticate here with graph
auth and then we did that code 10 step and then we can just do graph deploy um
we need to give a version label we follow here the samewhere and boom the sub
graph is deployed now we see here it starts to index it's already at 100 because
I mean like the block is not that long ago and now we can go into the playground
and with the playground it's important that we can go here to the graphql
Explorer and here we can explore all things that we can query with graphql it's
very cool we can look into how other subgraphs look like so we can open the
transfers for example and see and see the block number timestamp and just select
all these fields that we store in the database and now I can send that query and
boom I have everything here so now we have we have a contract and we don't need
to mess around with Json RPC

[10:05] getting that data out from the contract or anything we just can use this
very nice graphical interface we have here a development query URL that I can
put into my front end and and send these queries and makes it much easier and
maybe just to uh to to make sure that I'm not choking here so I can do a save
mint again so let's say I mint myself to token id2 so I sent this confirm let's
wait on either scan until it is uh picked up okay so they say they have it maybe
the graph already has it too let's check we can go again here transfers send
boom we see we have two transfers already on that contract now the beautiful
thing is like we have now quick start we have like a graphical interface to our
events um so we can very quickly start to program but like at some point we
probably want to start to extend so we

[11:17] want to have like maybe diff different entities so for example now we
see we only have to transfer events but I might want to have like an account
entity that keeps track of the addresses and how which nfts that they have this
would be the next steps but um I'm jumping back so for those that are interested
in doing this here is the QR code that links to GitHub repo where we where we
see um you can download the code it's the and and there is also like a link to
presentation there is a cheat sheet but what I wanted to do is like in the first
10 minutes of that talk to just like remove the fear of using that new
technology because basically if you know if you know what to do it's like four
steps and we already have like this powerful graphql API so that's very cool but
um behind the scenes I quickly want to explain like what happened here what what
was what was this so we can start with the idea of what is a smart contract and
what is the problem so with with a smart contract basically we have um just
storage and the smart contact we talk we talk about the current state so

[12:30] the smart contract knows uh who owns Which nft currently right but the
smart contract directly there is no call to the smart contract to ask who owned
it before these are this is hidden in in transactions um on the blockchain but a
contract basically knows about its current state and not necessary about its
historical state um but that's very important especially for nfts we need we
want to see the value of an nft actually is who owned it before and how much was
it was paid so like just knowing who owns it now is not good enough so we need
to have like more data and uh for historic data so when we go back to the same
example with the crypto punks um smart contract like what the graph basically
does is like it's a time machine for that data so we it keeps track of what they
what how did the data develop over time um yeah and when we send a transaction
to the blockchain then a new uh yeah a new block will create or the transaction
will be in the block and it's like always one on top of each other but there's
also a problem if that with that setup because uh initially we we thought about
like okay

[13:43] um we have gonna have this fully decentralized future so everybody has
can download front-ends via ipfs kind of in a trustless way and runs blockchain
node on its own computer and and then so we have like really these Unstoppable
apps that was the original idea um as well as you probably remember this this uh
this uh what was it missed the missed browser right yeah the Miss browser was
set up like this yeah but um then but we came away like the problem is now how
it developed forward and we have like now the blockchain is very bright
optimized and incentivized database uh it's also append only and and we pay to
write to the blockchain with gas fees right and so that the validators include
the block but reading data from the blockchain is an unsolved problem because um
or are not in the protocol so to say so it's very hard look the Json RPC
interface to get data out of the blockchain is not optimized to get fast data
out and it's not optimized to actually be used in a front-end it's a very low
level uh a thing that um I tried to explain it with when I maybe connect to my
home router then with Json RPC I maybe send some commands to set it

[14:55] up but it's not like a protocol to actually extract data in bulk so
people end up with a JavaScript code like this uh like all these awaits things
and all of these are like queries to the Json RPC endpoint and all of these can
take maybe 200 and 300 milliseconds depend on the RPC provider and when like and
what the code does is just simply displays all the nfts that someone holds right
and yeah and because of this async nature if someone has 10 or 20 nfts like such
a page takes several seconds to Lo to load and that's just like unacceptable
wait time in terms of modern u-x's um and so like that's where the graph
actually comes in you know sitting in between the blockchain and the user
interface or like the consumer could also be like a data science uh or like uh
yeah data science application that that that gets some data and and wants to do
some calculations on top of it is the indexing protocol and we see now with the
green arrows and now we have like an intentivization mechanism which is the
graph protocol so like index intent device to index that data with uh with
indexing rewards but

[16:08] also uh the users pay a little bit per query to the index so that they
also have an incentive to to serve that data and and now we have like a proper
incentivization mechanism to also have data indexed and published and then we
can end up with this beautiful graphql uh query like this to just get all the
requests nfts from a user and usually such a request resource in in uh yeah 100
200 milliseconds and not like several seconds yeah so that is the graph we say
like a API for a vibrant decentralized future um on the hosted service which was
built to as a proof of concept we currently have like one to two billion queries
per day big uh big names like uni swap audios and stable enzyme and and others
are using the graph some of them are using the decentralized network also um so
it's basically really a fundamental part of the professional dap stack I would
say and not only there is this hosted service but also like there's really this
decentralized indexing Network protocol uh really the vision of saying like hey
data needs to be public it needs to be uh it couldn't be in silos

[17:21] that like a centralized company tries to um also build a business model
on top of it in the extract value from the user it really should be like a
network it should be a public good it it should be owned by us all and so we
have this um this decentralized graph Network there are like more than 200 like
actually now it's 440 indexes worldwide these are individual entities um that
are run graph nodes or I run an indexer for us to serve that queries and that
also gives like this redundancy across the globe like the when we publish a
subgrapher decentralized network usually 10 to 15 indexes start to index that
sub graph and when one indexer goes down then another one is there to jump in um
and that gives us a very fast and cheap and reliable option for for our data
needs and that's also be going towards This Global open API and that actually
enables to build this truly decentralized apps like you know the D in-depth is
for decentralized and now we actually can can do it again um I quickly showed
you the sub graph like I said before that is the the Manifest and holds
everything together then there is the database schema which just defines um the
database shape and

[18:34] then the mappings which extract data from the blockchain and store it
into that into the database and uh or other others like I said before like we
always send transactions to the network and they're all laid on top of each
other but for a protocol like ethereum we have a lot of different protocols
interacting and that kind of gives this mass of transactions that are all stored
in the same store and what subcrafts do is actually bring bring them together so
we have like one database for each um protocol and and that actually is a is a
function of organizing data and subgraph developers basically organize the data
on the blockchain and yeah this is roughly how it works we have the dab on the
top sends transactions to the smart contracts get indexed by the graph node and
then on the other hand side the graph node serves these query through a graphql
API or in this um nice GIF we see uh that's what sub graphs do is taking that
mass of transactions and magically bring them into in order um yeah so now for
the marketing side I need to slide so when you want to tweet about it to learn
about subcraft development now is your time

[19:47] um okay I see that nobody wants to do it it's okay I wouldn't all you
want okay um yeah uh I would say like I have 10 minutes 10 seconds left this is
just a repetition but I'll just go quickly through the slides to say you these
slides are linked in the GitHub also um so you can read them by yourself I just
want to go to my last slide because it's in the thank you should be where is it
here nice okay do you have time for questions or okay any questions uh yeah
that's the simple one you're talking about database but it's not a database it's
a table actually at the lower layer of the graphql yes I mean um in in the
indexers they run a postgres database yes and correctly you said

[20:59] uh so in this schema here we Define tables yeah thank you and the
subgraphy you mean like the the image that I had yeah yeah it's it's a database
image um but it's all in the same database technically but uh one sub graph
consists of multiple tables cool thank you so much for attending this talk and
have fun
