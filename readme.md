#WEB RTC
Refer to Video = https://www.youtube.com/watch?v=FExZvpVvYxA

- Stands for Web Real-Time Communication
- Peer-To-Peer
- Enables rich media communication

####NAT
- Stands for Network Address Translation
- It basically is a way of translation of local network IP addresses to a single IP address.
- Example = Our router has got a public IP address . So , when we make a request to any website in that case our router translates our local-IP address (let’s say it’s 10.0.0.1) and converts it to our public IP while retaining the info of the local IP as it will need to send back the information to the requesting computer.

####NAT Translation Methods
- One To One NAT ( Full-cone NAT)
- Address Restricted NAT
- Port Restricted NAT
- Symmetric NAT ( web RTC doesn’t work with this and for most of the time the above mentioned ones are only used)


#####One To One NAT ( Full-cone NAT)
- It basically means that whenever a packet is sent to the router it will always relay it to the user without checking/caring about the origin of the packet.
#####Address Restricted NAT
- It basically means that Router will only allow signals from those IP addresses (regardless of port) with whom it has communicated before ( that means who it trusts).
#####Port Restricted NAT
- It’s exactly like Address Restricted NAT but it also takes port in consideration.


####STUN
- Stands for Session Traversal Utilities for NAT
- It basically is used to tell the user about it’s public IP Address:port/ public presence through NAT.
- Basically it returns a packet as a response which contains our public IP:port.
- Apart from Symmetric NAT , it works for the remaining three of them.
- Usually it’s present on port 3478.

####TURN
- Stands for Traversal Using Relays Around NAT.
- Used in the case of Symmetric NAT.
- It’s basically just a server that relays packets . Meaning it Just acts as a medium of communication between two devices (i.e. It’s not Peer-To-Peer anymore).

####ICE
- Stands for Interactive Connectivity Establishment.
- ICE candidates = Local IP Addresses , Reflexive Addresses(STUN) , Relayed Addresses(TURN).
- It’s Job is to basically collect all information (Like how communication etc is gonna be established) and store it in SDP.

####SDP
- Stands for Session Description Protocol.
- It’s not actually a protocol but in fact it’s just a format that  describes ICE candidates , networking options , media options , security options and other stuff.
- We Somehow need to send it to the user with which we are trying to connect , the method of transmission doesn’t matter.

####SDP Signaling
-Signaling basically stands for conveying the information.
-It doesn’t matter how we send it.
-IRL - WebSocket is basically used for sending purposes.

