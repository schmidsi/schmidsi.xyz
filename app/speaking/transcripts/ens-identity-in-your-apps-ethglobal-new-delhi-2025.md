---
source: YouTube auto-generated captions
uploaded: 2025-10-16
duration: 1223
---

[00:11] Hello. Hello everybody. Um, yeah, my name is uh Simon and I work for ENS
labs and I will be joined by Nisha and Happy later on and uh we go quickly
through what is ENS and like how you can use it in your apps. Okay, let's get
started. So to catch your attention, ENS uh is basically giving 10K in in prizes
for this hackathon um with five projects that can get the prize. So the first
one will get 3,500, the second one 2,000, and then three times 1,500. Um in
order to get the prize, pay attention now. But basically what we want to see is
like creative users of ENS. And I don't want to tell you what to build because
like you are just the the creative people that build something cool. But just
make sure that you use ENS. In my opinion, you can use ENS in everything that
you might want to build at this hackathon because it's the Ethereum name
service.

[01:04] Also, um if you have any questions like there is the hacker pack, so you
can uh scan that QR code and then you come to a notion page. We will actually
update that notion page according to the questions that we see at the booth. So
keep an eye on that. And also um you will find the telegram link to the to the
ENS developers telegram group. It's kind of a created group with like developers
of ENS from the whole ecosystem. Um, it's very high quality. So, you can join
there and ask questions. Don't be shy, but don't don't shill your stuff
otherwise we'll immediately ban you. Not saying that anybody of you intend to
shill your stuff. I just want to place it here. Okay. So, what is ENS? So,
Ethereum is ENS is the Ethereum name service. It's a decentralized and
permissionless naming protocol that lives in Ethereum and scales to the entire
internet. Okay. So basically it turns these complex hex addresses uh that nobody
understands into human readable names. I used to joke and say like whoever is
able to come to me and and from top of their head tell me your Ethereum address
I will send you on the spot 100 USDC. But no cheating you need to have it on top
of your head. So far nobody was able to do that. I'm it's still it's still going
on but everybody kind of like is easy to

[02:17] to remember a name right like the drex krill like the auto defrail at
DNS um it's easy with that name um so that's also I remember mine it's pretty
easy it's SCS um so that's very cool so you can also say that ENS is for web
three but DNS is for web two they actually work pretty pretty well together
which we see later on um so with with DNS we don't when you go on a browser you
don't go and Google you know You don't type this thing. You go to google.com or
you know ensommains or whatsoever. But um but in the background oops sorry what
happens is that uh uh basically in like that's um transparent technology you
don't really understand but like the brow or you see that's used but the browser
will do a DNS query resolves the the IP address and then sends the request to
that IP address first and the same uh actually works with ENS. So anywhere you
could put IP address browsers use DNS. Anywhere you read or write an address in
Ethereum or other blockchains actually you can use an ENS name. So that you see
um here for example you see MetaMask. So when MetaMask when you type in ENS name
it automatically finds the address and you can interact and then the other

[03:28] screenshot is from Etherscan again there like whenever you have an
address um and that is also an ENS you see the the name or not the address which
makes everything more easy. Quick talk about resolution. So we talk about
forward resolution. So that's kind of name to address. Um please note that one
that one name can have different addresses on different chains. It's actually
pretty important. So some something that people often get a bit wrong. Uh in in
that example actually we have always the same address but you can have different
addresses on different L2s. Um and then reverse solution is is the opposite. So
you get an address and you need to have to know which chain you want to look it
up and then it finds you the name and together this is what it's called the
primary name. So the primary name is when the address points to a name and the
name points to that address on that chain that if that loop is complete we talk
about the primary name and recently we launched a futures it's called the L2
primary name which basically says um when you have an address and you uh you can
have a a base name and you still can say my my address on on Ethereum on mainet
resolves to that base name but you

[04:40] configure the base name on base. So that's now working maybe something
to explore in your hackathon like how you can leverage L2 primary names what
they they actually do and if there's any tooling or stuff. So as I said like
yeah it's on base. So um yeah we talk about usernames get profiles questions
later at the booth usernames uh to profiles um so you see like Greg like
everywhere it's basically portable profile. So if you have a ENS name, you can
take it with you in web 3 and everywhere. Uh like Rainbow, uh Limo, VCA,
whatever supports it. Um you see that here. So it's actually also more than um
as I said, it's not just that resolution. You can have like full profiles, you
know, with profile image, um uh description, you can link your X accounts, your
your GitHub, and so on so forth. You can upload um uh files and uh and see like
in my example even you can configure your Solana address or your bitcoin address
in in your name and and and you also see that my arbitrum address is different
from my mainet address and on top of that you can even import like DNS uh so you
can

[05:55] have SCS.box box or even at com or io or IDE whatsoever you can import
that into ENS and then start to um link addresses and text records to that DNS
name on ENS. So that's pretty cool. Something I love to see also at the
hackathon someone uses that. Um as I said there are subnames. So like a very
popular one is that from bass. So there is like chess.base. Um that's also
working or one that you might want to check out it's onshow. that has like a lot
of different things configured that you can explore all the features. Okay. Why?
So users should never experience uh an interactive access. That what I think
it's just hard like we developers we kind of like it right but like for users
it's it's it's complicated. So Ethereum has its rough edges if you want an ENS
sits around and makes these rough edges smooth and for the if global India it
kind of like sits around your hack project and makes it smooth for you users to
use if you implement it properly. So how does it work in a nutshell? So you have
a resolver the registry that has names that point to resolvers. Um it's not and
the resolver then later on can resolve the actual address or the text record.

[07:07] So we can you see that so you have the correct thrill again has an
address can resolve an address or text structure or content hashes. This is the
public resolver. Um we can also have offchain resolvers with a uh harp harpy.
We'll uh um explain a little bit later more in depth. But basically how it works
um when someone resolves something on on dot stand base then it the smart
contract um reverts and says like hey actually you need to look it up offchain.
So we call that CCIP read. Here is like how it works in general. So like there's
back and forth but we will go a little bit deeper later on. Uh, one thing I want
to mention here is um, we just recently launched a so-called universal resolver
and the universal resolver is a is a new resolver that basically is the only one
address that you need to know when you interact with ENS and want to resolve
name. Um, and that is implemented so you don't really need to think about that
much as long as you use VM as version 2.35 or higher then it automatically uh,
is configured for you.

[08:16] you actually don't need to do much but it's important to have that if
you have already application on Ethereum or if you plan to build one at the
hackathon make sure that you have that VM address because later on we will have
ENSV2 launching in the next couple of months and and then you're already
prepared with the universal resolver all right what can you build anywhere I
said like text addresses you should so names so we see people like as usernames
avatar primary names we you can have a content hash you can upload your static
files to IPFS and then link it to your ENS name. Um there are some features. Um
don't you know like I'm a little bit fast here but like the whole pres
presentation you find in that hacker pack that will I will show the cure code
again at the end but you can also come to the booth um just having it here for
the record. So ecosystem and tools this is like the cue for first initial
nishial uh talks to you about smart contract naming and I will quickly open up
the presentation.

[09:16] Um so you can use ENS to uh name smart contracts but Nish is better to
explain GMGM. So um I think you must have you know used smart contracts.
Everyone we interact with smart contracts and whenever we you know see in wallet
we see this hex address and we are like confused and you know it's it's purely
bad UI we don't know what we are interacting with or is it a genuine contract or
a malicious contract we don't know so what do we do we go to you know ether scan
blog scout or any other blockchain explorer and then we check okay so what's the
label is it really e register or is it anything else so we rely on this offchain
and you know uh not not a a and decentralized solution.

[09:59] It's a centralized and off-chain solution and we rely on these and these
can be you know uh anyone can hack basically. So and we can also you know set
nickname on like wallets but that is also a local not an onchain solution. So
the problem with the hacks right is in uh 2024 we saw 144 million USD lost on
these address spoofing and also poisoning attacks on Ethereum and you know uh
this was because uh the contract they don't have name. So suppose uh you are
interacting with unisep right and you are interacting with a router and you see
a hex address. I know the blockchain is safe but uh the D app the front end that
is that is hackable that is not safe right and someone replaces that router of
unis swap with a with a different malicious uh contract you go to ether scan you
check the label and they have already the label you see okay this contract is
verified and you you don't like care about the code right you see okay this
contract is verified it has the label of unis swap let's interact and you lose
lose all your money right what if you have a router dounis right And now you
know if you try to forward resolve it uh goes to the correct um like address and
when you try to know reverse resolve

[11:12] that address it goes to the uniswap.outer.unisep.e. So I think this is
what we are trying to achieve. So contract needs name right now if you see this
is a wallet in which you can see um v10.restre.h right. So we know this contract
belongs to the domain of ens.h and ens.h H is a reputable domain so you can tr
trust it and you can also reverse resolve and forward resolve it right it
belongs to the ENS contract so this is what what we are trying to achieve um and
also like we are trying to you know increase the trust and reputator uh like
basically reputation and we can yeah so whenever you're trying to you know
deploy a contract it should be a best practice to name your contract now the
question arises how will you know name your contract So the first thing I think
even Simon like explained about is like forward and reverse resolution. Forward
resolution when a name resolves to address and this can be said by anyone but
reverse resolution is when a address resolves to a single name and this is done
only by the owner. So what we need to do is have a ownership or access control
in a

[12:26] contract. So this can be done like in two ways. The first one is you
import ownable make your contract ownable and you can set anyone as a owner and
that owner can basically set or change primary name for your contract. The other
way uh which is not a recommended but still usable is importing reverse claimer
and when you uh reverse when you import this reverse claimer you can delegate
the naming permission to someone else. Maybe you are just a deployer and you you
know give delegate this permission to a DAO and the DAO can change or set a
primary name for your contract. But then uh after after that you need to you
know call the set name for address and you need to know about uh the reverse
resolution and also the what is the resolver and all those stuff and then uh you
need to create a subname those stuff. So we at Enscribe what we did is simplify
all this process. So we have a simple beautiful UI in which you just need to uh
connect your contract um owners wallet and then you enter the contact address
then you enter the desired name. Suppose my name is nitell.eth I want to name my
contract as my app.initial.eth I will enter my address. I will enter my name and
that's it. That's the

[13:37] transaction. And also I think uh Simon already said like we are
supporting the L2 primary names. So uh what used to be happen in before NIP 19
that you can only set primary name on L1 chain but now you can also set primary
name on these L2 chains. So do explore that uh this is how your contract will
look like. So the contract has this v0.app.inscribe. I can also set versions for
my contract. Then uh who is the deployer? It is app.inscribe. And I have the
verifications and even if you see see in this um blockchain explorer like ether
scan or block scout or even in wallets right everywhere you will see a name.
Okay. So also we are coming with m adding metadata contract metadata and this is
coming soon. So basically uh you have you can you know show everything in one
page. You can have the uh like the dogs the category even the security audits
and the compiled metadata and everything. So do uh you know uh the best practice
do do name your contract and yeah if you have any doubt uh please meet me. Yeah.
Thank you.

[14:45] >> Thank you Michelle. And uh next up is um happy with subnames. >> So
or what are subs? So ENS lets you create subnames for your parent name uh that
can again be used as just another ENS name. So you know if you have ens you can
create controller or control.Ns. Or registister.NS. You know any number of uh uh
ENS accounts just if you own a parent name. And that's basically you know just
like how you do with DNS. And so uh let's uh cover up and see what are the types
of subnames. Uh L1 subnames are the simplest and the most decentralized subnames
out there. And since they are on Ethereum mainet, they work almost similar to
the ENS names. And you know a good example would be the default subnames that
you create from ENS manager app. uh and for a b if you want to automate it or
want to uh do some custom implementation you can do that as

[15:57] well if you you know if you want to deploy that your own registry just
let us know at the booth and would be happy to uh take it forward. Next comes
the L2 subnames. So you can issue uh subnames on L2 chains uh wherein you can
inherit the security uh from Ethereum mainet and also get the cheaper gas fees
uh from the L2s right and in this case you also get an NFT issued a popular
example would be the base names names all these and pisad and gi these guys are
issuing the uh L2 sub names uh next comes the often subnames uh these are
completely capacitors and but they work exactly similar to the ENS name or the
only problem you know you don't get an NFT since they're completely offchain and
these uh subnames are actually stored uh on a backend server so you know they
are a bit centralized but it's a good way if you want to onboard your few
customers or few uh people any person who wants to you know just getting started
and a good example would be CVID uh you know Coinbase and Unis swaps uh uni E
subnets that you see inside the wallet and next

[17:11] comes the EIP 3668 the CCI IP read that actually powers the offchain and
L2 subs. So uh it's very simple uh you know uh you make a a client could be a
metam mask or vim anything they make a request to resolver and the resolver
reports with the offchain lookup error. This error actually contains a gateway
URL. So gateway uh URL is the place where the entire data is stored or you know
you can query the data from and you can have a custom implementation logic there
you know in the case of optin subnance it could be your L2 chain and the case of
optin subnance it will it will be your backend server so you can you know uh it
will revert with an off lookup uh uh error and then you'll get uh the gateway
URL which will ping it and you know once you ask then you ping the uh uh gateway
URL from there and you get the data. Uh next step is uh you know the client
metam mask will verify if your data is correct or not by decoding it and then
you know if it's decoded it will just return the data. Now comes uh the uh
reason why you are here uh how to issue L2 subnames. So the best implementation
would be uh during dev uh

[18:25] where you have this reference implementation on how to issue L2
subnames. you get complete control uh over the uh issuance of the subnames. So
they get a bit complex but they have a custom logic for minting and you know
they're more decentralized as the registry and the logic is on chain. On the
other hand, we at namespace offer simple integration through SDK. Uh you know,
you get inbuilt token gating with any NFTs or you know you can white list some
accounts uh uh you can custom uh uh you can do some custom pricing or and
reserve some ENS uh subnames if you want. Uh but the mending logic is offchain
uh just uh uh so you know you don't uh you get a a lean design and you know you
don't have to pay a big hefty gas fee once you're deploying it and you know we
are available on base and optimism and next is the option subames we have a
custom implementation uh you can visit to the starter kit that is inside the
notion page uh that you'll find at the end of the uh you know uh in the slides
and you can come to our booth anytime you want to know about it and for name
space you know uh we give easy to implement SDKs just list your ENS name on our
platform and it's usually

[19:37] good good to go again uh we have these use case of unis swap unit which
actually hit 2 million subnames and again can also have chain identity from base
thank you >> thank you well done uh so we talked a lot about this uh uh this
thing. So I think I bring it up again. Uh see there's a lot of more slides that
you can skip through but I think most importantly even some MCP stuff. Most
importantly scan the QR code and uh go to that notion page and come to our booth
if you have questions. Thank you so much.
