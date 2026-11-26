---
source: YouTube auto-generated captions
uploaded: 2023-01-31
duration: 2408
---

[00:05] Welcome to the state of data infrastructure for those who don't know me
yet my name is Raphael I work at M stable and uh yeah I would like to to pass it
over for you to introduce yourself like why don't you Google okay hello hi I'm
Makoto I'm a developer uh ens and I'm here mostly because ens is one of the
oldest smart contracts so whenever there's a new day provider comes they usually
use us as an example so I I basically use most of the providers so I can provide
the view from the user oh hi guys uh thanks for staying with us I was afraid
that at this time we will be talking to an empty room uh I'm tomek I'm city of
Taken flower we are new data provider and we provide the full decoded history of
blockchains focusing not only on history of actions like events and calls but
also the state and storage history my there my name is Hugo I'm a growth manager
at analytics done we basically are a data platform open data platform

[01:18] for launching data um yeah that's it hello my name is Simone I work for
actionode which is one of the core Dev teams behind the graph protocol and the
graph protocol is the decentralized data layer for web3 um yeah cool okay uh I
think they would like to start with a question it's like uh I think since we
have like a lot of people building uh infrastructure here I would like to to
learn a little bit about like what are you doing right now to onboard more data
scientists and more people in this space to be using the infrastructure and
build more things and I would like to listen from a quarter like what how has
been your experience on boarding and learning of all of these things right right
yeah so I was checking kind of GitHub commits to say when we I first started
each project and then I think the deal sorry the graph was the earliest that our
actually sub graph is actually built by isia built by the I think graph team
then we focused it and maintained and the past commit was 2018 August and I
started contributing I think around 2019 and how I got to is uh

[02:31] I think graph was quite active on the hackathons so like when I went I
think the first time I met the team was uh East Denver and you guys had the
Bounty so like that that you know just yeah I just went into and it's actually
great to have a kind of uh face-to-face uh kind of interaction and at that time
I think graphql wasn't as popular as I am right he is right now so I did it I
knew nothing about graphql but I just got the Hands-On then I think uh doing was
2020 March right in the middle of the ECC curve that was right a week before the
lockdown and actually the Frederick was there at the ECC conf and he actually
said yeah we are making uh the graph for the ens and can you take a look so
that's how I actually got into actually like sitting for the three days half of
the time I was just sitting right next to the Frederick and doing that that's
that I think because I was kind of oddly adopted all the product came to me I
mean the previous position that all the experts just like sit down next to me
and that happened it was talking for today that actually

[03:44] had a yeah just one-to-one session and he just thought you know just had
a like a master class of how to use token flow so that's how I got into it but
yeah I guess because in a blockchain space every documentation is always lagging
so the asking to the depot directly is the best way how I learned yeah learning
yeah it's a very interesting point because uh yeah I have been in many chats
with that as well as I experience this myself but I would like to pass it over
to to you guys like how you've seen yesterday you had this great talk about the
importance of using data as a foundation for building products on top of it and
I think that more and more projects today they are maturing and they are trying
actually to use the data and they are trying to onboard data analysts and data
scientists and here's the problem because there are not so many crypto native
good data analysts and data scientists and on the other hand in the traditional
finance and web tool there are tons of them so many projects today trying to
onboard people from outside of crypto bubble and they very quickly hit the wall
because the crypto data the

[04:59] blockchain data is hard to get hard to understand hard to make any sense
of it so instead of like doing what they what they want to do and what they can
do and what they are trained to do they are fighting with getting data and
processing that they are preparing the data adding semantics to data and this is
what we try to do we try to build the ecosystem of data of good data that makes
people from outside of crypto to effectively build models for risk management
user management product management so they need the business context in data not
like not transactions and events so this is I think very important I love this
point that you mentioned because even for uh when we were hiring a data
scientist like for our team one of the things that I did is was to make sure
that the code example that this person was going to work on was super easy
because otherwise it will be like analyzing if they could retrieve data from own
chain right which was not an exercise I wanted to see what they could do with
the data so I really

[06:12] it is what they hate to do they hate to like look search for data that
they like data they like to analyze data but they hate like sourcing the data so
something that is interesting to me is that um I've been able to see how much of
um I don't know how to put it but there's a huge short Touch of data analyst and
data scientists in the space I because of my work I speak to many protocols
every week and you can see how many of them have issues finding the right Talent
um just because as he was saying not that many people have the skills of a data
analyst and really understands how blockchains work and actually can understand
what a transaction is and the kind of data the transaction leaves right so um
it's one of the things that we have identified as something that we really need
to work on making it easier for people to become an analyst to the space and
this is an area where we are investing a lot because you know if the number of
people building uh and being able to analyze data in the space doesn't grow then
we're

[07:26] it's not going to be good um good for anyone um so we're launching all
sorts of um education initiatives uh such as like I've seen courses but also
sync courses uh we did one experiment a few months ago that worked very well we
had 600 applications for 30 spots that were available we're going to hackathons
uh we have Lounge um office hours live training sessions bi-weekly so all of
these different activities that can help us bring more people in yeah and it's
amazing because the moment people graduate from some of these things it's so
easy for them to get a job because of that short touch there is in the market
and it's it's yeah I don't know and uh and Simone how do you see all of that
because uh I think the graphs became almost like this uh full stack thing like a
front end as soon as you know the graph you could consider only yourself as a
full stack developer and webtree yeah I would say that was the original value
proposition actually um that uh the graph like because also the the language

[08:40] choice of graphql of how you retrieve the data um mostly appears to
front-end developers because that's actually the the industry standard or what
was was anticipated to be the industry standard nowadays I would say um but on
the same time now when we talk about data scientists for them graphql is not so
common language of retrieving data interestingly although me personally coming
from Front End still think it's the best language um anyway so like one thing
that we now do is in together with Missouri one of the new core devs is a python
library that do you can then which is something that all data Design This are
familiar in or usually they go with python and then they can build their their
dashboards in code on top of the sub graphs that the messari creates and also
these standardized sub graphs which have more this direction of uh four data
science scientists are a little bit a better data source than let's say the ens
subgraph which is primarily built to power the ens website which is a different
application so this is the thing and on top of that obviously we go to
hackathons and then see all the people others and um yeah and some educational
initiatives

[09:54] okay cool uh I think I will like even send another another question to
you to you which is I think it's something that you're talking your previous
like today which was about the decentralized network so I would love to to hear
a little bit about how you feel about the centralization point of the data
infrastructure in decentralized data infrastructure that we have right now in
the space yeah sure I mean um yeah we saw it with tornado cash right that there
is a real that there is a real need and uh I mean sure you can make the argument
that when that the underlying data the blockchain data is decentralized and you
don't need to necessarily build all the stack on top also decentralized nothing
that's valid um that said we try to to create that alternative and give the
people the choice and and then in the end coming with this possibility of really
having a decentralized stack that is Unstoppable so one of the big value
propositions of the graph is this idea of Unstoppable apps that even if the
developers appadon the projects the data stack and the smart contracts and
everything is still here and even the possibility like there's this idea of I
don't know like when Facebook made these updates

[11:07] recently or not recently like back back in the days right people were
outrageous about the new UI right but they also didn't have a choice imagine you
could just like say oh I just want to stay with this old version that I liked it
and um that's only Possible only possible if you have a decentralized data layer
what are your thoughts like you guys on this yeah I think um I don't the way we
think about it when we have a discussion around these things is you like we
don't like decentralization for the sake of the centralization or we don't like
a token for the sake of a token the the talking question is a question that we
always get is don't gonna make a token and the question is what for exactly
right so if it doesn't mean that we're never going to do a token or that we're
never going to decentralize our systems it means that first we need to make sure
we're building something useful for our users and that our product really works
and solves problems and I think um there's a lot to do there we're also thinking
from a different

[12:20] point of view in terms of like as he was saying this data these systems
are already open and decentralized anyone can get access to Raw um data coming
from nodes right but the real question is how do you make sense of this data and
it's very obvious that the the amount of data that these new networks produce is
just going to increase more and more and more and so the question is can you
build some sort of open system or open platform that allows a collective of
people to build shared knowledge on and that's why Dune is very much Community
oriented it's open um or most of the data that it's not raw everything is open
source and you can um just like collaborate and and add your your value to it so
that's the way we're thinking about it how to surface the right data and I think
that to answer your question it's quite important to understand what we mean by
decentralization because uh I don't believe in decentralization of petabyte
volumes of data that can be effectively

[13:34] queried for complex analytical queries I don't think that we have
technology that's even close to this today but we can what we can do we can
decentralize codes we can decentralize pipelines so this is what the graph is
doing now as far as understand is to open source and to decentralize the
Transformations and the pipelines so everybody can replay everything and can
verify the data so this is this kind of like verify verifiability by
reproducibility very complex words in English so you can you can like prove the
the the the the the correctness of data by replaying everything that is actually
decentralized so I think that the the thing that we can do today is to
decentralize pipelines to decentralize code not the data itself but the data can
be rebuilt by anybody because we all use at the end of the day we use the same
public trusted data sources yeah I I love this because I feel like that's where
with my question that is it working no

[14:48] okay sorry I think that's where I wanted to go with my questions is
because for example like I feel like right now more than ever uh we need to have
a way to verify like how was that data built and especially in the five
protocols uh to really show for example like uh is that TV I already the TV out
that you're saying like are you generating that fees like where is that uh all
these tokens is stored right like so I don't know what would be your thoughts on
this like that to have this audible way of looking into the reports that we're
seeing you mean the way to verify the data yeah again it comes down to how open
the component is that like for example in case we didn't like I built most of
the deal uh dashboard for ens and I occasionally get DM to say hey you have a
wrong SQL here and there and it's great that like you know it's not like a dune
platform itself doesn't have to be open source but as long as my query as an end
user is open source I can get the you know with someone crowd like someone who's
better can verify uh that's yeah that I think the key and but

[16:04] at the same time there's not much incent what it's hard that like
there's so many queries I think uh subgraph you you said like 500 uh subgraph
you have right now on the network yeah yes and this ens is ready to be popular
so always there's someone's eye on it but you can't expect everybody's checking
all these things well you have a curator model so maybe there's some sort of
decentral but like yeah I think and again it's also it comes to the education
that there's not many data layer people in the industry so it's hard to verify
yeah and then I think anything to do with smart contract logic it has to be like
trustless it has to be you know code is low but the data representation layer
doesn't necessarily have that kind of check mechanism so perfect example is I
think lots of like you know like dijang uh EO farming stuff it has like a medium
API and all that stuff but like a medium API of this like you know fish fish
Swap and this like octopus swap are they using like to like it's hard to tell
you know unless you anyone

[17:17] someone's examine go by call so yeah that that's still the challenge I
think I think Simone like that I feel like especially on this topic like I love
the example that in your talk you mentioned how Miss sari was finding all of
these issues with datas like which kind of data it is like which protocols
produce each data and one question that I have like very open to you always like
how do you see inter probability of data across not only between protocols but
also between platforms right because for example even at us items table when we
were building a lot of our data sets and trying to do analysis it was a mix of
everything right it was a mix of Dune it was the graph and then some other like
in-house code so I don't know would love to hear your opinions on this the first
thing that comes to mind is that when it comes to standardization um

[18:28] there's always this tension between a top-down approach and like a
bottoms up uh like what I'm trying to say is if you want to have a standard you
need to make sure some people agree into something and Implement that so it's
pretty much a top-down solution whereas what we just said this approach we have
to data is very much open and Bottoms Up anyone can come can build anyone can
see what others have built anyone can build their own pipelines etc etc etc and
that's very much Bottoms Up and emergent and something like this you cannot
control it and build a standard out of it and it's a bit of it but I feel like
for something like raw data that is coming straight from a node I'm sure there's
a lot that can be done in terms of standardization that it should be fairly easy
to do but then as you add layers on top of it and it's user adding those layers
and it's free for everyone to do it's very very hard to control exactly the
higher you go with the data processing the more of things like creativity like
you know like competitive modes appear but at the at the foundations we
basically use the same data and the meaning of the date of

[19:42] this raw data is defined by its my contracts so if we are like
processing events there are the same events regardless of the source of the data
so if you have query or even in June you can run on our data sets because if you
are using events you are using the same events right so at the bottom level it
should be very easy to standardize things and we should like do it because this
is this is very important for like uh this interoperability this uh cooperation
collaboration on data to have common standards uh the the good metadata at least
at this basic level and it shouldn't be that hard in this space because we we
are starting from the same sources and also we as a community have a great
history of like doing things together so corporate world today is investing huge
money into building metadata into like building this whole data governance
systems in Corpus to to like make people using the same terms and the same
meanings of data we should be doing the same from the very beginning and we have

[20:54] a great opportunity to actually do it one thing to add is like I think
standardization view for standardization of the blockchain database depends what
layer you are and I mean a bit lower layer like actually building the schema and
looking into the stuff for me it's a paradise because most of the day saws they
uniquely has a transaction hash so whatever the data it comes it most they say I
can verify a transaction hash this goes I go to Esa scan and cross check it so
like it always I have a multiple reference point whereas if you are kind of you
know analyst in a bank or someone who doesn't know how transaction Works how
smart contract works it's completely black box so for these people if the yeah
site name is different they don't understand but if in my like layer like it's
actually very standardized like my comparison is like I used you know I was
developer I was in actually I was in a financial industry so I used to be DBA
where like a data schema is complete you haven't across like if you go to
different banks and stuff and in the web too well there's no relevance between
the

[22:06] Facebook API data and the Twitter API data whereas in blockchain is
amazing because it's just everything is you you see the block you see the
transaction hash it's standardized but again yeah if you see from the surface
level it looks like a complete chaos I think but we have a great building box
that the lower layer is it's all like standardized so I think we are much easier
to kind of bring that standardization much easier ways to the people who don't
necessarily know the you know Smart Level I think yeah I wanna I wanna quickly
go back to this uh verifiable data and I think uh the answer here is really it
depends like if if you just build a dashboard let's say uh if that's Missouri
data I have service tune and and you you have a park in in however you build it
and and it so it shows a number wrongly like maybe a 2X or 10x wrong I mean like
yeah okay it's bad it's bad data Maybe it leads to bad decisions but yeah you
can fix the bug later and okay but if you use data that is the input to your
risk management protocol on chain that is a managing millions of of dollars then
you don't want to have this situation where like oops um the API server had an

[23:19] update and now I don't know what the data was from right so that's why
at the graph we have um This research team for verifiable queries where um the
queries from the graph Network eventually should be like immediately be verified
um with uh we've taken a cryptographic technology called The Road Runner I hope
we can published his paper in the next month um to the to the to the openness of
the data I mean at the graph we try to like we build everything open source and
so one thing for example we looked at the data extraction raw data extraction
from the blockchain and that's where the fire host comes in like that the goal
there is it's open source should be an open standard for all blockchains um
streaming fast works with not only ethereum but also with fifth Solana or Aptos
or Cosmos or near or RV but to bring the all this in the same formats and then
layers and layers on top um that that's how we how we want to build it yeah okay
cool like a is it working now again or no okay anyway uh I feel like I don't
know I feel like we still have like a couple of like open for questions but I
don't know like if the number here is correct otherwise I would ask one question
like

[24:34] I have time right okay okay so I still have time okay cool yeah but I
think it's wrong there's like timer but uh okay so one of the questions that I
would like to ask you all like before we open for questions is like what do you
think right now it's missing in-day space or what do you think it could be add
to onboard more people um into like a I don't know bring in more data scientists
like to web tree I think that this whole data ecosystem is relatively young
still young and very basic we have to learn a lot we I think we are ages behind
web to world when it comes to data analytics we need the standardization this is
very very important we need to build this analytical culture uh in the in the
ecosystem this is something that we are learning a lot and I think that the bear
Market is good opportunity for this because when it's like the bull market and
digit time you know whatever you do you earn money so you don't need data at all
and when it's like the time like today you have to analyze

[25:46] to select good products you need to manage risks you have to think about
hedging your position so you get data right there's this old saying that the
newspapers sell best during the war and I think that this is the time for for
data providers and yeah I'm excited about yeah I'm so when you talk to teams you
can see how early we are in terms of data in the space um many teams like most
most of the teams are still relatively not that sophisticated when it comes to
their data practices so I think the one one thing is just you know having time
to evolve learn and progress but another thing that I'm excited about is for
Avenues and ways for these teams to share knowledge together and share best
practices Etc so um I don't know this is just an example it's not to Shield
anything but we did um Duncan in September but just in general having events or
whatever online or or face to face for these

[27:00] people to meet each other learn from one another I think it's very
interesting and very important because yeah again it's very early and at the
same time data in web3 is not exactly as what data and web to so there are new
things you need to learn and share yeah I agree like the shortest one thing that
we as a community can can get better about by learning best practices but I
think it's also very important to try to onboard people from outside the space
into the space like grow the space basically and I think best would be through
documentation come on no I think actually I mean the the bear Market is is the
build market right and I mean sure otherwise uh you're you're running trying
trying to keep your servers running because it's crashing because everybody has
uh everybody Chomps in but now everything is a bit more calm and and uh also I
think now it's the opportunity to to write more write more tutorials guidelines
on board more people take the time now I have more of the technical kind of
requests is more about that so like graph uses a assembly script and the other
like token

[28:16] flow and the uh during using SQL and the library support is we have the
limiting in that like in all the developers they use use like Esa JS web 3 pi
and you know all these stuff and it's relatively difficult like many people in
the ECM industry is relatively young they are kind of hipsters and their SQL is
like you know from 50s like you know it's a kind of you know like Boomers
language so even in my team there are not many people who know the SQL and also
the fact that lots of there's lots of things uh ethereum data and the low level
is very kind of binary heavy and all those stuff and you need a lot of like data
processing and especially in this case you have to do like hashing even to uh
encoding decoding just to match the name and something like that it's actually
super super difficult to do in any of your platform and the one thing I have to
sell the Google is that Google's have something called Google big query and they
actually index uh decode some of the data and the one advantage is that I

[29:29] can import isos.js on other user defined function so that actually
there's one thing I was doing like it currently we are defining new Emoji
standard in uni uh DNS because everybody loves emoji and to to run the query of
the new set of emoji I was writing the query with Google big query and because I
could use e such JS and the ability to use battle tested these client like other
programming language into your look you know kinda like SQL or graphql assembly
script that would make productivity I think increase the productivity and it
brings that it's much easier for normal devs who's diving into getting to this
space into anal networks I think great example of how much there is still for us
to do like how much work there is ahead like yeah interesting that you say that
SQL is is the Boomer language because like it it seems to be it seems to be uh
the language of choice for data scientists and I mean like I think a great
amount of success of tune is exactly that strategy of having SQL

[30:42] access and this flexibility actually we use snowflake as a core data
infrastructure and in Snowflake you build queries using SQL but you can also
create your functions in JavaScript and in Python so actually you can like
utilize all those languages in querying snowflake data just uh talking about SQL
I think what's great about SQL is that um you don't need to be a developer to be
able to start using and and getting results out of SQL so actually at Dune we
have onboarded a ton of people that they don't have a CS background but they
feel comfortable using SQL so I'm not sure if it's Boomer or not but it's
definitely a great way to import people into the space yeah I agree yeah I feel
like yeah is it no okay no no okay I think it's your problem I think it's a me
problem on this like but anyway uh I feel like one of the points that I think
you you guys didn't touch was like that not a lot of people understand that you
can query everything like on blockchain and even me coming from like a like a
company that we use

[31:56] to do data intelligence we could never even like do data analysis on our
customers data and not even thinking about competitors right so I feel like all
the time that I talk this to like the friends that I had that was working there
say Hey you cannot imagine you can query everything right like you should join
the space now you know like so it's very interesting but yeah thanks so much for
the talk and I would love to open the the room for questions they organize yeah
how do you all feel Trad fine web 2 coming into the space is going to change
data infrastructure with big brand names like Disney Nike Adidas um going to the
nft market NF uh Reddit going into nfts and Community points and then Goldman
and JP Morgan doing D5 transactions what do you think infrastructure is going to
look like when not if when Mass adoption comes in from web 2 and tradify
institutions do you think it's going to be different from now will they adopt
these you know schemas and languages or will it be something completely
different and to make you'd have good Insight with

[33:08] Snowflake and how they're thinking of things I'd love to hear how
everyone's looking at it and then if neat be how you're thinking through
adapting to it challenge to open the our crypto data to outside world to all
those players that want to analyze what's happening here and integrate this data
with their own data and we will have to like I think that we will have to to
change a little bit and we will have we will have to adapt our processes and our
structures to provide the data in a way that Disney wants to get because they
will not change for us this is my perspective and again I think that we have
many things to learn from the web too also this is not that bad from our
perspective especially in data and analytics world it's it will be a very good
lesson for the whole ecosystem if the big players from outside of crypto start
looking for our data and we will have to adapt our processes our infrastructure
to serve this data data effectively for them I so in here I think that it's

[34:22] like webto companies have way more established data practices um pretty
much everyone follows the same kind of ways of working with data um and there's
a huge industry to surveys these needs you have companies like so flake and
others that are huge and um pretty much have done a great work at serving these
companies something that I'm really curious about and and I really want to see
is how this evolves for protocols and um more of web3 native companies and
organizations I think this is where the change really is going to need I'm not
sure the data practices for these things are going to be exactly the same as web
2 and a lot of the infrastructure Tech and processor Etc is going to have to
adapt so I feel like the change is going to be coming more from that side of the
market than web 2 because in order to like to serve web to companies you pretty
much have standards that you can follow and they ask you to follow those
standards um

[35:34] yeah I agree with that I think that they they will they will more or
less say how they want to see the data and then someone will provide it in that
form uh to to win the business uh but an hour but also agree that we can learn a
lot from them because uh I think General I think as the web 3 space we should
not only laugh about web 2 but also learn because in in certain areas they are
like way ahead I think my view is that like already some big players start
choosing uh I think two things one is a kind of multi-chain future it will be
more accelerated about big partners are using the different chains so like if
you want to do something interesting cross chain or data platform natively has
to support as many chains as possible which is quite challenging and also it has
to be able to stitch them together especially ens like we are trying to support
as many cross chains as possible to let you uh ens data in different chains the
challenge will be that how do they stitch them together to easily to digest
that's one thing and another thing I personally think is the kind of privacy
things that like I think some of the DK roll-up area they're talking about

[36:46] datability to be kind of not all of them available some of them they can
uh I think area to be able to not to expose then I think that kind of standard
light is far less than the everything public current state of ethereum and and I
I want to see more of the standardization between different chain which supports
the kind of privacy layer to see we don't have to show something private and we
can't but I think yeah it's good to know which yeah some standardization around
that area I think I think I will go with Simone and here saying that uh it would
be kind of like almost like a SAS thing like someone will build for them and
they will just consume anyone has any other question yeah so uh before you were
saying that um when when people finish the Dune course uh they all got a job
like pretty easily but there hasn't really been my experience and like for me it
wasn't that easy to find jobs as uh data scientists there aren't a lot of offers
and I think we're

[38:00] not there yet uh so how do you actually uh onboard protocols uh to start
hiring are using and using data scientists yeah that's a great question and I
appreciate the the comment um so I guess it's the other side of the market which
is maybe it's not that visible in terms of um the way many analysts have gotten
jobs so far is by getting into some discords getting involved into some
communities so there's no there's no Open Marketplace for data analyst jobs in
crypto and and yeah it's a great point something we've done recently is launch
um like data jobs in crypto so on Dune website you can see protocols and
companies that are are hiring for um data analysts it's still a small thing um
it's something we put together in like two weeks or something so it's not like
you know but um but I think there's a lot of work to do in making all of these
companies that are hiring visible many times these companies are hiring and but
they don't

[39:13] have a they don't have an open application you don't know it yet they
are looking for the something that happens very often to us is that um Dune
analysts and we call them Wizards people reach out to them and offer them jobs
and if you have a somehow of a good profile I'm doing you you're going to be
making money one way or the other for sure but the question is how do we make
all of these companies and protocols that are hiring for analyst be more visible
and you know and for these not to be something a little bit of an Insider thing
um yeah so I appreciate it okay I think we're over time and my mic is working
finally all right thank you not for long thank you so much and I appreciate
