//Must be in /root and check the Allow Import Button at bottom of code editor
A={}
A.password="password" //What the password will be changed to when getting a number object
A.name="shadow"//Program Data Folder Name if local it will be /home/user_name/shadow_data
A.mode="mp" //Sets the game mode to either mp=MultiPlayer or sp=Single Player
A.log_msg="Hacked By Spork" //Message left in the Behind in corrupted system.log file and in .batch files that the program creates
if A.mode=="mp" then 
    A.data_sf={"ip":"92.222.88.168","port":22,"user":"root","pass":"Avisio"} //Server Information for the remote server used to store program files not need if you want to store data locally
    A.hard_sf={"ip":"166.42.187.187","port":22,"user":"root","pass":"Corpion"}//Server Information for the remote server used to use metaxploit.so and crypto.so that way you dont't ruin your own hardware
else
    A.data_sf={"ip":"92.222.88.168","port":22,"user":"root","pass":"Avisio"} //Server Information for the remote server used to store program files not need if you want to store data locally
    A.hard_sf={"ip":"166.42.187.187","port":22,"user":"root","pass":"Corpion"}//Server Information for the remote server used to use metaxploit.so and crypto.so that way you dont't ruin your own hardware
end if