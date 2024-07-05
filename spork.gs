import_code("/root/pconfig")
A.version="Public Alpha 0.1"
A.call=program_path.split("/").len-1
color = {};color.u="<u>";color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03><b>init:</b></color> ";error = "<color=#AA0000><b>Error:</b></color> ";warning = "<color=#FF8701><b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
format = function(text, fillLastRow=false);text = text.replace("\\\\",char(20000)).replace("\\<",char(20001)).replace("\\>",char(20002)).replace("\\ ",char(20003)).replace("\\n",char(10));text = text.replace("<b>","<b><mspace=9.9>").replace("</b>","</mspace></b>");origList = text.split(" ");for e in origList;if e.indexOf(char(10)) isa number then;sp = e.split(char(10));origList[__e_idx] = sp[0];origList.insert(__e_idx+1,[char(10),sp[1]].join(""));__e_idx = __e_idx + 1;end if;end for;while true;start = text.indexOf("<");if typeof(start) == "null" then break;finish = text.indexOf(">",start);if typeof(finish) == "null" then break;text = [text[:start], text[finish+1:]].join("");end while;text = format_columns(text);lines = text.split(char(10));if fillLastRow then text = [text," "*(lines[0].len-lines[-1].len-1)].join("");newList = text.split(" ");i = 0;for item in newList;if item != "" then;newList[__item_idx] = "";while i < origList.len and origList[i] == "";i = i + 1;end while;else;continue;end if;newList[__item_idx] = origList[i];i = i + 1;end for;return newList.join(" ").replace(char(20000),"\").replace(char(20001),"<").replace(char(20002),">").replace(char(20003)," ");end function
A.local_shit=function()
    c=A.sessions.current.host_computer
    s=A.hardware_server.scp("/root/lib/metaxploit.so","/home/guest",A.sessions.current)
    bat=c.File("/home/guest/BS.bat")
    if not bat then
        cr=c.touch("/home/guest","BS.bat")
    if typeof(cr) == "string" then
        user_input("There was an error when creating the file: " + cr)
     else
        bat=c.File("/home/guest/BS.bat")
     end if
    end if
    sr=bat.set_content("meta=include_lib(""/home/guest/metaxploit.so"")"+char(10)+"get_custom_object[""local_meta""]=meta"+char(10)+"get_custom_object[""local_switch""]=get_switch"+char(10)+"get_custom_object[""local_router""]=get_router"+char(10)+"get_custom_object[""local_rshell""]=include_lib(""/home/guest/librshell.so"")"+char(10)+"exit")
    if typeof(sr) == "string" then
        user_input("There was an error while setting file content 21: " + sr)
     else
        br=A.sessions.current.build("/home/guest/BS.bat","/home/guest")
        if br != "" then
            user_input("There was an error while compiling 25: " + br)
         else
            bat.set_content(A.log_msg)
            A.sessions.current.launch("/home/guest/BS")
            A.sessions.local_object={"local_meta":get_custom_object["local_meta"],"local_router":get_custom_object["local_router"],"local_rshell":get_custom_object["local_rshell"]}
         end if
        end if
        if A.sessions.local_object.len>0 then
            if typeof(A.sessions.local_object["local_meta"])!="MetaxploitLib" then user_input(color.red+"Failed Getting Local Meta")
            if typeof(A.sessions.local_object["local_router"])!="router" then  user_input(color.red+"Failed Getting Local Router")
            clear_screen
        end if
end function
A.programs={};A.handlers={};A.sessions={};A.sessions.current=get_shell;A.local_shell=get_shell;A.local_computer=get_shell.host_computer;A.sessions.shells=[{"object":get_shell,"user":active_user}];A.sessions.computers=[];A.sessions.files=[];A.shared={}
A.session_manager=function(mode="menu")
    if mode=="menu" then
        data="# Public Lan User"
        n=0
        for item in A.sessions.shells
            shell=item["object"]
            data=data+char(10)+n+" "+shell.host_computer.public_ip+" "+shell.host_computer.local_ip+" "+item["user"]
            n=n+1
        end for
        print format(data)
        sel=user_input("Select Shell> ").val
        options=["delete","connect","exit"]
        pick=A.sessions.shells[sel].object
        n=0
        for o in options
            print n+")"+o
            n=n+1
        end for
        opt=options[user_input("#").val]
        if opt=="delete" then 
            A.sessions.shells.remove(A.sessions.shells.indexOf(A.sessions.shells[sel]))
            clear_screen
            A.session_manager
        else if opt=="connect" then 
            A.sessions.current=A.sessions.shells[sel].object
            A.local_shit
            A.terminal
        else if opt=="exit" then
            A.local_shit
            A.terminal
        else
            print "Not Valid Option"
            wait 3
            clear_screen
            A.session_manager    
        end if
    else if mode=="save" then
        A.sessions.shells.push(A.sessions.current)
        A.terminal
    end if
end function
A.debug_msg=function(message="Debug Shit",clr="white");print(color[clr]+message);user_input(color.white+"Press Enter To Continue",0,1);end function
A.results=[]
A.stream_check=function(msg="You Are About To See Colonel Sanders' Secret Recipe!");if A.mode=="sp" then return;clear_screen;x=null;while x!="SAFE"; x=user_input(color.yellow+"<B>>>"+msg+"<<</b>"+char(10)+color.white+"Enter 'SAFE' Once GreyHack Is No Longer On Stream!> ");clear_screen;end while;return 1;end function
A.shared_exploit_DB=function(mode="load",mlib,m=null,value=null)
    DB_dir=A.computer.File(A.ram.path+"/exploits")
    if not DB_dir then A.computer.create_folder(A.ram.path,"exploits")
    if mode=="save" then
        fldm=0
        flim=0
        for folder in DB_dir.get_folders
            if folder.name==mlib.lib_name then
                fldm=1
                for file in folder.get_files
                    if file.name==mlib.version then
                        flim=1
                        if file.get_content=="" then
                            file.set_content(m+":"+value)
                        else
                            file.set_content(file.get_content+char(10)+m+":"+value)
                        end if
                    end if
                end for
            end if
        end for
        if fldm==0 then A.computer.create_folder(DB_dir.path,mlib.lib_name)
        if flim==0 then 
            A.computer.touch(DB_dir.path+"/"+mlib.lib_name,mlib.version)
            file=A.computer.File(DB_dir.path+"/"+mlib.lib_name+"/"+mlib.version)
            file.set_content(m+":"+value)
        end if
    else
        fldm=0
        flim=0
        found=[]
        for folder in DB_dir.get_folders
            if folder.name==mlib.lib_name then
                fldm=1
                for file in folder.get_files
                    if file.name==mlib.version then
                        flim=1
                        lines=file.get_content.split(char(10))
                        for line in lines
                            if line=="" then continue
                            if line.split(":").len!=2 then continue
                            found.push(line)
                        end for
                    end if
                end for
            end if
        end for
        return found
    end if
end function
A.shared.hack=function(mlib,third="$",metaxploit=null)
    A.results=[]
    if metaxploit==null then metaxploit=A.meta
    found=A.shared_exploit_DB("load",mlib)
    if not found or found ==[""] then 
        mem=metaxploit.scan(mlib)
        for m in mem
            add=metaxploit.scan_address(mlib,m).split("Unsafe check: ")
            for a in add
                if a==add[0] then continue
                value=a[a.indexOf("<b>")+3:a.indexOf("</b>")]
                value=value.replace(char(10),"")
                if A.debug==1 then print color.yellow+"m:"+m+"-"+"value:"+value
                A.shared_exploit_DB("save",mlib,m,value)
                result=mlib.overflow(m,value,third)
                if result and typeof(result)!="null" then A.results.push(result)
            end for
        end for
    else
        for f in found
            m=f.split(":")[0]
            value=f.split(":")[1]
            result=mlib.overflow(m,value,third)
            if result and typeof(result)!="null" then A.results.push(result)
        end for
    end if
    return
end function
A.shared.wordlist=function
    sh=[]
    tn=0
    files=A.computer.File(A.ram.path+"/wordlists").get_files
    ft=files.len
    for file in files
        tn=tn+file.get_content.split(char(10)).len
        passwds=file.get_content.split(char(10))
        passwds.reverse
        for p in passwds
            if p!="" then sh.push(p)
        end for
    end for
    return[tn,sh,ft]
end function
et=function
    A.remote_server=null
    A.hardware_server=null
    A.fake_server=null
    if A.mode=="sp" then
        A.remote_server=get_shell.connect_service(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass)
        A.hardware_server=get_shell.connect_service(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass)
        if typeof(A.hardware_server)=="shell" then A.programs.logs.run(A.hardware_server)
        if typeof(A.remote_server)=="shell" then A.programs.logs.run(A.remote_server)
    else
        A.remote_server=get_shell.connect_service(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass)
        A.hardware_server=get_shell.connect_service(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass)
        if typeof(A.hardware_server)=="shell" then A.programs.logs.run(A.hardware_server)
        if typeof(A.remote_server)=="shell" then A.programs.logs.run(A.remote_server)
    end if
    if typeof(A.remote_server)=="shell" then
        if A.remote_server.host_computer.File("/root/nodes") then
            nodes=A.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
            nodes.shuffle
            ip=nodes[0].split(":")[0]
            pwd=nodes[0].split(":")[1]
            A.fake_server=get_shell.connect_service(ip,22,"root",pwd)
            if typeof(A.fake_server)=="shell" then
                A.programs.logs.run(A.fake_server)
                A.programs.logs.run(get_shell)
                get_custom_object["meta"]=null
                A.fake_server.launch("/root/getlibs")
                A.fake_meta=null
                if get_custom_object["meta"]!=null then A.fake_meta=get_custom_object["meta"]
            end if
        end if
    end if
end function
A.setup=function()
    et
    if typeof(A.remote_server)!="shell" then;A.server_type="local";A.server=get_shell;A.computer=A.server.host_computer;if active_user=="root" then home_dir="/root";if typeof(A.hardware_server)=="shell" then A.programs.logs.run(A.hardware_server);else;A.server=A.remote_server;A.computer=A.server.host_computer;A.programs.logs.run(A.server);A.server_type="remote";if typeof(A.hardware_server)=="shell" then A.programs.logs.run(A.hardware_server);end if
    get_custom_object["server"]=A.server;get_custom_object["home_shell"]=get_shell;get_custom_object["home_computer"]=get_shell.host_computer
    if typeof(A.server)!="shell" then A.server=get_shell;if typeof(A.computer)!="computer" then A.computer=get_shell.host_computer
    A.crypto=null;A.meta=null;A.results=[]
    if A.server_type=="remote" then;A.computer.create_folder("/root",A.name.lower+"_data");A.ram=A.computer.File("/root/"+A.name.lower+"_data");get_custom_object["crypto"]="null";get_custom_object["meta"]="null";if typeof(A.hardware_server)=="shell" then;A.hardware_server.launch("/root/getlibs");A.crypto=get_custom_object["crypto"];A.crypto_type="remote";A.meta=get_custom_object["meta"];A.meta_type="remote";end if;if typeof(A.crypto)!="cryptoLib" then A.crypto=null;if typeof(A.meta)!="MetaxploitLib" then A.meta=null;else;A.computer.create_folder(home_dir,A.name.lower+"_data");A.ram=A.computer.File(home_dir+"/"+A.name.lower+"_data");end if
    if A.meta==null and A.programs.find.run("metaxploit",1)==true then;A.meta=include_lib(A.programs.find.run("metaxploit",0));A.meta_type="local";end if
    if A.crypto==null and A.programs.find.run("crypto",1)==true then;A.crypto=include_lib(A.programs.find.run("crypto",0)); A.crypto_type="local";end if    
    get_custom_object["meta"]=A.meta;get_custom_object["crypto"]=A.crypto
    A.computer.create_folder(A.ram.path,"programs");get_custom_object["ram"]=A.ram;A.computer.create_folder(A.ram.path,"bios");A.bios=A.computer.File(A.ram.path+"/bios");A.computer.touch(A.bios.path,"mode");A.computer.touch(A.bios.path,"hackshop");A.hsf=A.computer.File(A.bios.path+"/hackshop");
    get_shell.host_computer.touch(home_dir,".version")
    get_shell.host_computer.File(home_dir+"/.version").set_content(A.version)
    for file in A.bios.get_files
        if file.name=="mode" then;if file.get_content=="" then;file.set_content("cli");A.use_mode="cli";else;A.use_mode=file.get_content;end if;end if
        if file.name=="hackshop" then;if file.get_content=="" then;file.set_content(A.programs.find.run(1));A.hackshop=file.get_content;else;A.hackshop=file.get_content;end if;end if;
    end for
    A.computer.touch(A.bios.path,".drama");A.dramaf=A.computer.File(A.bios.path+"/.drama");if A.dramaf.get_content=="" then A.dramaf.set_content("0");A.drama=A.dramaf.get_content.val
    A.computer.touch(A.bios.path,".debug");A.debugf=A.computer.File(A.bios.path+"/.debug");if A.debugf.get_content=="" then A.debugf.set_content(0);A.debug=A.debugf.get_content.val;if A.debug==1 then clear_screen=print
end function
A.info=function()
    clear_screen;hide=1;if A.debug==1 then hide=0
    print color.white+"Thank You For Using "+color.yellow+program_path.split("/").pop;print color.white+"Created By: "+color.yellow+"Quinn(discord:midsubspace)"+char(10)+"Discord Link: https://discord.gg/wyCE8hPZ6h";print color.white+"You Are Running Version: "+color.yellow+A.version;
    if A.computer.is_network_active==0 then;print color.white+"INTERNET STATUS: "+color.red+"Offline";else;print color.white+"INTERNET STATUS: "+color.green+"Online";end if
    if A.server_type=="remote" then;print color.white+"WAREHOUSE STATUS: "+color.green+"Remote";if hide==0 then print color.white+"WareHouse IP: "+color.yellow+A.remote_server.host_computer.public_ip;else;print color.white+"SERVER STATUS: "+color.green+"Local";end if
    if typeof(A.hardware_server)=="shell" then;print color.white+"HARDWARE STATUS: "+color.green+"Remote";if hide==0 then print color.white+"HardWare IP: "+color.yellow+A.hardware_server.host_computer.public_ip;else;print color.white+"HARDWARE STATUS: "+color.green+"Local";end if
    tor_total=0
    if A.computer.File(A.ram.path+"/tor") and A.computer.File(A.ram.path+"/tor/nodes") then
        if A.computer.File(A.ram.path+"/tor/nodes").get_content!="" then tor_total=A.computer.File(A.ram.path+"/tor/nodes").get_content.split(char(10)).len
        if A.computer.File(A.ram.path+"/tor") and A.computer.File(A.ram.path+"/tor/nodes") then;print color.white+"Tor Nodes:"+color.yellow+tor_total;end if
    end if
    pwd_total=0
    wordlists=A.computer.File(A.ram.path+"/wordlists")
    if not wordlists or wordlists.get_files.len==0 then
        pwd_total=0
    else
        for file in wordlists.get_files
            for line in file.get_content.split(char(10))
                if line!="" then pwd_total=pwd_total+1
            end for
        end for
    end if
    print color.white+"PASSWORDS LOADED: "+color.yellow+pwd_total
    if A.computer.File(A.ram.path+"/exploits") then
        exp_total=0;exploits=A.computer.File(A.ram.path+"/exploits");exploitsl=A.computer.File(A.ram.path+"/exploits/local")
        if not exploits or exploits.get_files.len==0 then;else;for file in exploits.get_files;for line in file.get_content.split(char(10));if line!="" then exp_total=exp_total+1;end for;end for;if not exploitsl or exploitsl.get_files.len==0 then;wait 0.1;else;for folder in exploitsl.get_folders;for file in folder.get_files;for line in file.get_content.split(char(10));if line!="" then exp_total=exp_total+1;end for;end for;end for;end if;end if
        print color.white+"Exploits Loaded in database: "+color.yellow+exp_total
    end if
    if A.computer.File(A.ram.path+"/email.sql") then
        nmail_total=0;nmail_file=A.computer.File(A.ram.path+"/email.sql");nmail_total=nmail_file.get_content.split(char(10)).len
        print color.white+"Registered Email Accounts: "+color.yellow+nmail_total
    end if
    if A.computer.File(A.ram.path+"/server.sql") then
        nserver_total=0;nservers_file=A.computer.File(A.ram.path+"/server.sql");if not nservers_file then;nserver_total=0;else;nserver_total=nservers_file.get_content.split(char(10)).len;end if
        print color.white+"NPC Servers: "+color.yellow+nserver_total
    end if
    if typeof(A.meta)=="MetaxploitLib" then;print color.white+"Metaxploit Status: "+color.green+A.meta_type;else;print color.white+"Metaxploit Status: "+color.red+"Missing";end if
    if typeof(A.crypto)=="cryptoLib" then;print color.white+"Crypto Status: "+color.green+A.crypto_type;else;print color.white+"Crypto Status: "+color.red+"Missing";end if
    if A.hackshop!="" then;print color.white+"HACKSHOP: "+color.green+"Connected";if hide==0 then print color.white+"HACKSHOP IP: "+A.hackshop;else;print color.white+"HACKSHOP: "+color.red+"Disconnected";end if
end function
A.programs.logs={"name":"logs","desc":"Clears the logs of a system if ran as "+color.red+"root","usg":"XXX"}
A.programs.logs.run=function(object)
    objects=["file","shell","computer"]
    if not objects.hasIndex(typeof(object)) then object=A.sessions.current
    if typeof(object)=="file" then
        file=object
        fake_log=null
        while file.name!="/"
            file=file.parent
        end while
        access="guest"
        for folder in file.get_folders
            if folder.name=="root" and folder.has_permission("w") then access="root"
        end for
        if access=="root" then
            for folder in file.get_folders
                if folder.name=="etc" then 
                    for file in folder.get_files
                        if file.name=="fstab" and file.has_permission("w") then fake_log=file
                    end for
                end if
            end for
        end if
        if typeof(fake_log)=="file" then
            fake_log.set_content(A.log_msg)
            fake_log.move("/var","system.log")
        else
            print "CLEARING LOG FAILED!"
        end if
    else if typeof(object)=="computer" then
        if object.File("/root").has_permission("w") then
            object.touch("/root","system.log")
            object.File("/root/system.log").set_content(A.log_msg)
            object.File("/root/system.log").move("/var","system.log")
        end if
    else if typeof(object)=="shell" then
        if object.host_computer.File("/root").has_permission("w") then
            object.host_computer.touch("/root","system.log")
            object.host_computer.File("/root/system.log").set_content(A.log_msg)
            object.host_computer.File("/root/system.log").move("/var","system.log")
        end if
    end if
end function
A.programs.scanlan={"name":"scanlan","desc":"Scan Local Network For Devices","usg":"scanlan"}
A.programs.scanlan.run=function(mode="*")
    clear_screen
    s=A.sessions.current
    h=s.host_computer
    router_count=0
    device_count=0
    switch_count=0
    server_count=0
    ssh_count=0
    router=A.sessions.local_object["local_router"]
    routers_ips=router.devices_lan_ip
    if routers_ips.indexOf(h.local_ip)!=null then  routers_ips.remove(routers_ips.indexOf(h.local_ip))
    firewall_map = function(ip,router_object)
        firewalls = router_object.firewall_rules
        rules = {}
        num = 0
        if firewalls.len > 0 then
            print(color.white+"<u>Firewalls</u>")
            data = "ACTION PORT SOURCE DESTINATION"
            while firewalls.len > 0
                rules[num] = firewalls.pop
                num = num + 1
                //wait 0.1
            end while
            num = 0
            while rules.len != 0
                t = rules[num]
                fire = (t.split(" "))
                if fire[0] == "ALLOW" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("ALLOW")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data = data + char(10) + action + " " + port + " " + source + " " + going
                else if fire[0] == "DENY" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("DENY")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data = data + char(10) + action + " " + port + " " + source + " " + going
                end if
                rules.remove(num)
                num = num + 1
                //wait 0.1
            end while
            print(format_columns(data))
        end if
    end function
    device_type=function(ip,router)
        ports=router.device_ports(ip)
        if ports.len==0 then return "non-server"
        for port in ports
            if router.port_info(port)==null then continue
            if router.port_info(port).split(" ")[0]=="cam" then return "cam"
            if router.port_info(port).split(" ")[0]=="ssh" then return "ssh"
        end for
        return "server"
    end function
    nmap=function(ip,router)
        ports=null
        ports=router.device_ports(ip)
        if typeof(ports)=="string" then
            if ports.split(" ")[3]=="unreachable" then 
                print color.yellow+"BLOCKED BY FIREWALL"
                return ""
            else
                print color.red+ports
                return
            end if
        end if
        if ports.len==0 then
            print ""
            return
        end if
        info="PORT STATE SERVICE VERSION"
        for port in ports
            if router.port_info(port)==null then continue
            service_info=router.port_info(port)
            port_status="open"
            info=info+char(10)+port.port_number+" "+port_status+" "+service_info
        end for
        print format_columns(info)+char(10)
    end function
    for router_ip in routers_ips
        if typeof(get_switch(router_ip))=="router" then switch_count=switch_count+1
        router_object=get_router(router_ip)
        if router_object then
            device_version=router_object.kernel_version
            device_info="SWITCH"
            if get_switch(router_ip)==null then device_info="ROUTER"
            print char(10)+color.purple+device_info+":"+color.white+router_ip
            firewall_map(router_ip,router_object)
            for device in router_object.devices_lan_ip
                if device==router_object.local_ip then continue
                if device.split("\.")[2]!=router_object.local_ip.split("\.")[2] then continue
                if device==h.local_ip then
                    print color.red+"YOU ARE HERE->"+color.white+device
                    device_count=device_count+1
                else
                    if device_type(device,router_object)=="server" then 
                        type="Server:"+color.white
                        server_count=server_count+1
                    else if device_type(device,router_object)=="cam" then
                        type="Cam:"+color.white
                    else if device_type(device,router_object)=="ssh" then
                        type=color.yellow+"Server-SSH:"+color.white
                        ssh_count=ssh_count+1
                    else
                        type="Computer:"+color.white
                    end if
                    print type+device
                    if mode=="nmap" or mode=="-n" then nmap(device,router_object)
                    device_count=device_count+1
                end if
            end for
        end if
    end for
    router_count=routers_ips.len-switch_count
    print char(10)+"<u>Total Count:"+char(10)+color.purple+"Routers: "+color.white+router_count+char(10)+color.purple+"Swtiches: "+color.white+switch_count+char(10)+color.purple+"Devices: "+color.white+device_count+char(10)+color.purple+"Servers: "+color.white+server_count+char(10)+color.purple+"SSH Servers: "+color.white+ssh_count
end function
A.programs.local={"name":"local","desc":"Hacks libs in /lib","usg":"XXX"}
A.programs.local.run=function()
    A.local_shit
    A.hack_mode="local"
    A.computer.create_folder(A.ram.path,"exploits")
    if not A.sessions.current.host_computer.File("/home/guest/metaxploit.so") then s=A.hardware_server.scp("/root/lib/metaxploit.so","/home/guest",A.sessions.current)
    local_meta=A.sessions.local_object["local_meta"]
    A.MetaLibs=[]
    if typeof(local_meta)!="MetaxploitLib" then ;print program_path+" update";A.terminal;end if
    local_nmap=function()
        c=A.sessions.current.host_computer
        db=A.computer.File(A.ram.path+"/exploits")
        data="# Service Version"
        libs=[]
        for file in c.File("/lib").get_files;print file.path;libs.push(file.path);end for
        n=0
        for item in libs
            metalib=local_meta.load(item)
            if typeof(metalib)=="MetaLib" then
                A.MetaLibs.push(metalib)
                data=data+char(10)+n+" "+metalib.lib_name+" "+metalib.version
                n=n+1
            end if
        end for
        router=A.sessions.local_object["local_router"]
        print "ESSID:"+router.essid_name+"("+router.bssid_name+")"
        print "Public IP:<b>"+router.public_ip+"</b>Private IP:<b>"+router.local_ip
        print format_columns(data)
        return(libs)
    end function
    options=["one","all"]
    n=0
    for o in options;print n+")"+o;n=n+1;end for
    opt=user_input("PICK> ").val
    if options[opt]=="one" then;libs=local_nmap;opt=user_input("HACK:").val;A.MetaLibs=[local_meta.load(libs[opt])];else;local_nmap;end if
    if user_input("'F'all or 'B'ounce?").lower=="b" then;third=user_input("Lan:");else;third="*";if user_input("Pwds y/n> ")=="y" then third=A.password;end if;
    for metalib in A.MetaLibs
        if A.debug==1 then print color.blue+typeof(metalib+":"+metalib.lib_name)
        if typeof(metalib)!="MetaLib" then exit "FAIL"
        A.shared.hack(metalib,third)
    end for
        if A.results.len>0 then A.object_sorter
end function
A.programs.find={"name":"find","desc":"Find Files and Folders on a system","usg":"Search_Term"}
A.programs.find.run=function(term,mode=0)
    metalibs={}
    cryptolibs={}
    rshell_libs={}
    found_files=[]
    found_folders=[]
    search_files=function(folder,term)
        for file in folder.get_files
            if term=="crypto" or term=="metaxploit" or term=="librshell" then
                if file.path.split("/").pop.split("\.")[0]==term then
                    found_files.push(file.path)
                end if
            else
                if file.name==term then 
                    found_files.push(file.path)
                end if
            end if
        end for
    end function
    search_folders=function(folder,term)
        for folder in folder.get_folders          
            if folder.name==term then
                found_folders.push(folder.path)
            end if
            search_files(folder,term)
            search_folders(folder,term)
        end for
    end function
    search_folders(get_shell.host_computer.File("/"),term)
    if (mode==1 and (term=="metaxploit" or term=="crypto" or term=="librshell")) then
        if  found_files.len!=0 then
            return(true)
        else
            return(false)
        end if
    end if
    if term=="metaxploit" and found_files.len!=0 then
        for file in found_files
            if metalibs.indexOf(file)==null then
                meta_path=file
                meta=include_lib(file)
                version=meta.load(file).version
                metalibs[file]=version
            end if
        end for
        for meta in metalibs
            metalibs[meta.key]=meta.value.replace("\.", "").to_int
        end for
        highest=""
        vote=0
        for item in metalibs
            if item.value>vote then
                vote=item.value
                winner=item.key
            end if
        end for
        return(winner)
    end if
    if term=="crypto" and typeof(A.meta)=="MetaxploitLib" then
        for file in found_files
            if cryptolibs.indexOf(file)==null then
                crypto_path=file
                crypto=include_lib(file)
                version=A.meta.load(file).version
                cryptolibs[file]=version
            end if
        end for
        for crypto in cryptolibs
            cryptolibs[crypto.key]=crypto.value.replace("\.", "").to_int
        end for
        highest=""
        vote=0
        for item in cryptolibs
            if item.value>vote then
                vote=item.value
                winner=item.key
            end if
        end for
        return(winner)
    else if term=="crypto" then
        return(found_files[0])
    end if
    if term=="librshell" and typeof(A.meta)=="MetaxploitLib" then
        for file in found_files
            if rshell_libs.indexOf(file)==null then
                rshell_path=file
                rshell=include_lib(file)
                version=A.meta.load(file).version
                rshell_libs[file]=version
            end if
        end for
        for rshell in rshell_libs
            rshell_libs[rshell.key]=rshell.value.replace("\.", "").to_int
        end for
        highest=""
        vote=0
        for item in rshell_libs
            if item.value>vote then
                vote=item.value
                winner=item.key
            end if
        end for
        return(winner)
    else if term=="librshell" then
        return(found_files[0])
    end if
    if found_folders.len!=0 then
        if found_folders.len>1 then
            num=1
            for folder in found_folders
                print(num+")"+folder)
                num=num+1
            end for
            choice=user_input("Pick A.folder location to use:").to_int
            while choice>found_folders.len
                choice=user_input("Pick A.folder location to use:").to_int
            end while
            while choice<found_folders.len
                choice=user_input("Pick A.folder location to use:").to_int
            end while
            return(found_folders[choice-1])
        else
            return(found_folders[0])
        end if
    end if
    if found_files.len!=0 then
        if found_files.len>1 and term!="aptclient.so" and term!="metaxploit"  then
            num=1
            for file in found_files
                print(num+")"+file)
                num=num+1
            end for
            choice=user_input("Pick A.folder location to use:").to_int
            return(found_files[choice-1])
        else
            return(found_files[0])
        end if
    end if
end function
A.programs.update={"name":"update","desc":"Update Libs","usg":"XXX"}
A.programs.update.run=function(mode="local",location=null)
    r=get_shell.host_computer.create_folder(current_path, "lib")
    A.server.scp("/root/lib/aptclient.so",current_path+"/lib",get_shell)
    aptlib=include_lib(A.programs.find.run("aptclient.so"))
    print typeof(aptlib)
    if A.hackshop==null then A.programs.find.run(1)
    aptlib.add_repo(A.hackshop)
    aptlib.update
    package_list = ["metaxploit.so", "crypto.so","librshell.so","librshell.so"]
    if mode!="server" then
        if location==null then 
            location=current_path
        else
            location="/home/guest"
        end if
        computer=A.sessions.current.host_computer
        print "Local Mode"
        for package in package_list
            r=computer.create_folder(location, "lib")
            if typeof(r) == "string" and A.debug==1 then
                print("There was A. error when creating the folder: " + r)
            else if A.debug==1 then
                print("Folder got created")
            end if
            lib_folder = location + "/lib"
            if computer.File(lib_folder + "/" + package) == null then
                aptlib.install(package, lib_folder)
                print("Installed:" + package)
                if A.meta == null and A.programs.find.run("metaxploit",1)==true then
                    A.meta = include_lib(A.programs.find.run("metaxploit",0))
                end if
                if A.crypto == null and A.programs.find.run("crypto",1)==true then
                    A.crypto = include_lib(A.programs.find.run("crypto",0))
                end if
            else if aptlib.check_upgrade(lib_folder + "/" + package) == 1 then
                aptlib.install(package, lib_folder)
                print color.red+"Upgraded "+package
                if A.meta == null and A.programs.find.run("metaxploit",1)==true then
                    A.meta = include_lib(A.programs.find.run("metaxploit",0))
                end if
                if A.crypto == null and A.programs.find.run("crypto",1)==true then
                    A.crypto = include_lib(A.programs.find.run("crypto",0))
                end if
            else
                print("No Updates for " + package)
            end if
        end for
    else
        A.hardware_server.launch("/root/getlibs")
        print("Updated Server Libs")
    end if
end function
A.programs.nmap={"name":"nmap","desc":"Scans the Ports On A Network","usg":"IP"}
A.programs.nmap.run=function(ip)
    if ip == null then
        ip = user_input("IP Address:")
    end if
    if not is_valid_ip(ip) then ip = nslookup(ip)
    if not is_valid_ip(ip) then exit("IP Address Not Valid!")
    if is_lan_ip(ip) then
        router = get_router
    else
        router = get_router(ip)
    end if
    if router == null then
        exit("NMAP: Router does not exist: " + ip)
    end if
    if is_lan_ip(ip) then
        ports = router.device_ports(ip)
    else
        ports = router.used_ports
    end if
    if ports == null then
        exit("NAMP: No Ports Found: " + ip)
    end if
    if typeof(ports) == "string" then
        exit(ports)
    end if
    if ports.len == 0 then
        print("Scan Finished, No Open Ports Found"+char(10)+color.red+"You can only try and hack port 0 the router")
    end if
    firewall_map=function(ip)
        firewalls=router.firewall_rules
        rules={}
        n=0
        if firewalls.len>0 then
            print color.red+"Firewalls on: "+ip
            data=color.white+"ACTION PORT SOURCE DESTINATION"
            while firewalls.len>0
                rules[num]=firewalls.pop
                n=n+1
            end while
            n=0
            while rules.len!=0
                t=rules[num]
                fire=t.split(" ")
                if fire[0]=="ALLOW" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("ALLOW")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data=data+char(10)+color.green+action+" "+port+" "+source+" "+going
                else if fire[0]=="DENY" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("DENY")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data=data+char(10)+color.red+action+" "+port+" "+source+" "+going
                end if
                rules.remove(num)
                n=n+1
            end while
            print format(data)
        end if
        wait 0.1
    end function
    placeholder = "placeholder"
    data = color.white+"PORT SERVICE STATUS VERSION LAN"
    print(color.white+"ESSID: " + color.yellow+router.essid_name+"(" + color.yellow+router.bssid_name + ")")
    print(color.white+"Public IP:<b> "+color.yellow+router.public_ip+color.white+"</b> Private IP: <b>"+color.yellow+router.local_ip+"</b>")
    whois=whois(router.public_ip).split(char(10))
    for line in whois
        print color.white+line.split(":")[0]+":"+color.yellow+line.split(":")[1]
    end for
    print(color.white+"Kernel_Router.so Version: "+color.yellow+router.kernel_version)
    for port in ports
        service = router.port_info(port)
        service_name = service.split(" ")[0]
        if service_name == "students" or service_name == "employees" or service_name == "police" then service_name = "sql"
        service_version = service.split(" ")[1]
        service = service.split(" ")
        port_status = color.green+"OPEN"
        if ((port.is_closed) and not is_lan_ip(ip)) then port_status = color.red+"CLOSED"
        data = data + char(10) + port.port_number + " " + service[0] + " " + port_status + " " + service[1] + " " + port.get_lan_ip
    end for
    firewall_map(ip)
    A.computer.create_folder(A.ram.path,"ip_logs")
    A.computer.touch(A.ram.path+"/ip_logs", "nmap")
    nmap_log=A.computer.File(A.ram.path + "/ip_logs/nmap")
    if nmap_log.get_content=="" then
        nmap_log.set_content(ip)
    else
        nmap_log.set_content(nmap_log.get_content + (char(10)) + ip)
    end if
    if nmap_log.get_content!="" then
            lines=nmap_log.get_content.split(char(10))
            scrubbed_list=[]
            for line in lines
                if scrubbed_list.indexOf(line)==null then 
                    scrubbed_list.push(line)
                else
                    //wait 0.1
                end if
            end for
            nmap_log.set_content("")
            for item in scrubbed_list
                nmap_log.set_content(nmap_log.get_content+item+char(10))
            end for
    end if
    print(char(10) + format(data))
    return(ip)
end function
A.programs.ip={"name":"ip","desc":"Generates a Random IP","usg":"mode[*] num_of_ports[*]"}
A.programs.ip.run=function(mode="*",p="*")
    ip_gen=function();return([floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1].join("."));end function
    ip=ip_gen;router = get_router(ip)
    while (is_valid_ip(ip) == false);router = get_router(ip);wait 0.1;end while
    if p=="*" then;p=1;else;p=p.val;end if
    while router == null or router.used_ports.len!=p or typeof(router)==null or whois(ip)=="Address not found!";ip = ip_gen;router = get_router(ip);wait 0.1;end while
    if mode=="*" then
        return ip
    else if mode=="ssh" then
        ports=get_router(ip).used_ports
        v=0
        for port in ports
            if port.port_number==22 and port.is_closed==false and port_info(get_router(ip),port).split(" ")[1]=="1.0.0" then v=1
        end for
        if v==0 then
            A.programs.ip.run("ssh")
        else
            A.programs.nmap.run(ip)
            print ip
            return ip
        end if
    end if
end function
A.handlers.se=function(result)
    db=A.computer.File(A.ram.path+"/email.sql")
    if typeof(result)=="file" then 
        return ""
    else if typeof(result)=="number" then
        print color.purple+"Password Changed"
    else if typeof(result)=="computer" then
        cpu=result
        users=cpu.File("/home").get_folders
        for user in users
            if cpu.File("/home/"+user.name+"/Config/Mail.txt") and cpu.File("/home/"+user.name+"/Config/Mail.txt").has_permission("r") then
                email_add=null
                email_pwd=null
                uname=user.name
                email_add=cpu.File("/home/"+uname+"/Config/Mail.txt").get_content.split(":")[0]
                email_pwd=cpu.File("/home/"+uname+"/Config/Mail.txt").get_content.split(":")[1]
                //print uname
                //print email_add
                //print email_pwd
                email_pwd=A.programs.rainbow.run("hash",0,0,email_pwd)
                if A.debug==1 then print color.yellow+"PASSWORD: "+email_pwd
                if email_add!=null and email_pwd!=null then
                    db=A.computer.File(A.ram.path+"/email.sql")
                    if not db then;A.computer.touch(A.ram.path,"email.sql");db=A.computer.File(A.ram.path+"/email.sql");end if
                    if db.get_content=="" then
                        db.set_content(email_add+";"+email_pwd+";"+cpu.local_ip+";"+cpu.public_ip)
                    else
                        r=db.set_content(db.get_content+char(10)+email_add+";"+email_pwd+";"+cpu.local_ip+";"+cpu.public_ip)
                        if typeof(r) == "string" then
                            print("There was an error while setting file content: "+r)
                         else if A.debug==1 then 
                            print("File content got changed successfully.")
                         end if
                    end if
                end if
            end if
        end for
    else if typeof(result)=="shell" then
        cpu=result.host_computer
        users=cpu.File("/home").get_folders
        for user in users
            if cpu.File("/home/"+user.name+"/Config/Mail.txt") and cpu.File("/home/"+user.name+"/Config/Mail.txt").has_permission("r") then
                uname=user.name
                email_add=cpu.File("/home/"+uname+"/Config/Mail.txt").get_content.split(":")[0]
                email_pwd=cpu.File("/home/"+uname+"/Config/Mail.txt").get_content.split(":")[1]
                email_pwd=A.programs.rainbow.run("hash",0,0,email_pwd)
                if email_add!=null and email_pwd!=null then
                    db=A.computer.File(A.ram.path+"/email.sql")
                    if not db then;A.computer.touch(A.ram.path,"email.sql");db=A.computer.File(A.ram.path+"/email.sql");end if
                    if db.get_content=="" then
                        db.set_content(email_add+";"+email_pwd+";"+cpu.local_ip+";"+cpu.public_ip)
                    else
                        db.set_content(db.get_content+char(10)+email_add+";"+email_pwd+";"+cpu.local_ip+";"+cpu.public_ip)
                    end if
                end if
            end if
        end for
    end if
    duplicate_checker=function(file)
        if A.debug==1 then print color.yellow+"Checking "+file.path+" For Duplicate Entries"
        clean=[]
        lines=file.get_content.split(char(10))
        for line in lines
            if clean.indexOf(line)==null then clean.push(line)
        end for
        file.set_content("")
        for item in clean
            file.set_content(file.get_content+item+char(10))
        end for
        return
    end function
    duplicate_checker(db)
end function
A.programs.file_explore={"name":"file_explore","desc":"File Explorer","usg":"XXX"}
A.programs.file_explore.run=function(result=get_shell)
    if typeof(result)=="shell" then
        A.fs_type="shell"
        shell=result
        computer=shell.host_computer
    else if typeof(result)=="computer" then
        computer=result
        A.fs_type="computer"
        current_folder=computer.File("/")
    else if typeof(result)=="file" then
        check_perms=function(file)
            if file.has_permission("w")==true then 
                return "WRX"
            else if file.has_permission("r")==true and file.has_permission("x")==true then 
                return "-RX"
            else if file.has_permission("r")==true then
                return "-R-"
            else if file.has_permission("x")==true then 
                return "--X"
            else
                return "---"
            end if
        end function
        display_list=function(current_folder)
            clear_screen
            print("Current Path:"+current_folder.path)
            print color.purple+"Folders"
            print color.yellow+"Files"
            print color.white+"Binary"
            files=[]
            folders=[]
            data=color.green+"Name"+" "+"Owner"+ " "+"Permissions"+" Type"
            for file in current_folder.get_files
                files.push(file)
            end for
            for folder in current_folder.get_folders
                folders.push(folder)
            end for
            for file in files
                name=file.name
                owner=file.owner
                perms=check_perms(file)
                if file.is_binary==1 then
                    type="Binary"
                    data = data + char(10) +color.white+name+" "+owner+" "+perms+" "+type
                else
                    type="File"
                    data = data + char(10) +color.yellow+name+" "+owner+" "+perms+" "+type
                end if
            end for
            for folder in folders
                name=folder.name
                owner=folder.owner
                perms=check_perms(folder)
                data = data + char(10) + color.purple+name+" "+owner+" "+perms+" Folder"
            end for
            print char(10)+format_columns(data)
            terminal(folders,files,current_folder)
        end function
        menu=function(options)
            n=0
            for option in options
                print n+")"+option
                n=n+1
            end for
            return (user_input("Action> "))
        end function
        folder_actions=function(folder)
            clear_screen
            print "Targeting: "+folder.path
            options=[]
            options.push("enter")
            if folder.has_permission("w") then options.push("delete")
            if folder.has_permission("w") then options.push("rename")
            action=menu(options)
            if action=="enter" or options[action.val]=="enter" then 
                return("enter")
            else if action=="delete" or options[action.val]=="delete" then
                folder.delete
                return "Deleted"
            else if action=="rename" or options[action.val]=="rename" then
                folder.rename(user_input("New Name: "))
            end if
        end function
        file_actions=function(file)
            clear_screen
            print "Targeting: "+file.path
            options=[]
            if file.has_permission("r") then 
                options.push("read")
            end if
            if file.has_permission("w") then
                options.push("move")
                options.push("rename")
                options.push("delete")
                options.push("replace content")
            end if
            action=menu(options)
            if action=="read" or options[action.val]=="read" then user_input(file.get_content,0,1)
            if action=="delete" or options[action.val]=="delete" then file.delete
            if action=="rename" or options[action.val]=="rename" then file.rename(user_input("New Name: "))
            if action=="move" or options[action.val]=="move" then file.move(user_input("Move To:"),file.name)
            if action=="replace content" or options[action.val]=="replace content" then file.set_content(user_input("Type:"))
        end function
        terminal=function(folders,files,current_folder)
            current_object=null
            target=user_input("File> ")
            if target=="exit" then A.object_sorter
            if target==".." then 
                if current_folder.name=="/" then 
                    clear_screen
                    display_list(current_folder)
                else
                    display_list(current_folder.parent)
                end if
            end if
            for folder in folders
                if folder.name.lower==target.lower then
                    current_object=folder
                    break
                end if
            end for
            for file in files
                if file.name.lower==target.lower then
                    current_object=file
                    break
                end if
            end for
            if current_object.is_folder==true then 
                if folder_actions(current_object)=="enter" then display_list(current_object)
            else if current_object.is_folder==false then
                file_actions(current_object)
                clear_screen
                display_list(current_folder)
            else
                if user_input("Create File/Folder Named "+object+" In "+current_folder+" yes?'")=="yes" then creation_actions(object,current_folder)
                clear_screen
            end if
        end function
        while result.name!="/" 
            result=result.parent
        end while
        display_list(result)
    end if
    current_folder=computer.File("/")
    files=[]
    folders=[]
    check_perms=function(file)
        if file.has_permission("w")==true then 
            return "WRX"
        else if file.has_permission("r")==true and file.has_permission("x")==true then 
            return "-RX"
        else if file.has_permission("r")==true then
            return "-R-"
        else if file.has_permission("x")==true then 
            return "--X"
        else
            return "---"
        end if
    end function
    display_list=function(current_folder)
        print("Current Path:"+current_folder.path)
        print color.purple+"Folders"
        print color.yellow+"Files"
        print color.white+"Binary"
        data=color.green+"Name"+" "+"Owner"+ " "+"Permissions"+" Type"
        for file in current_folder.get_files
            files.push(file)
        end for
        for folder in current_folder.get_folders
            folders.push(folder)
        end for
        for file in files
            name=file.name
            owner=file.owner
            perms=check_perms(file)
            if file.is_binary==1 then
                type="Binary"
                data = data + char(10) +color.white+name+" "+owner+" "+perms+" "+type
            else
                type="File"
                data = data + char(10) +color.yellow+name+" "+owner+" "+perms+" "+type
            end if
        end for
        for folder in folders
            name=folder.name
            owner=folder.owner
            perms=check_perms(folder)
            data = data + char(10) + color.purple+name+" "+owner+" "+perms+" Folder"
        end for
        print char(10)+format_columns(data)
    end function

    menu=function(options)
        n=0
        for option in options
            print n+")"+option
            n=n+1
        end for
    end function
    file_actions=function(file)
        clear_screen
        print "TARGETING:"+file.path
        options=[]
        if file.has_permission("x") and file.is_binary then
            options.push("run")
            options.push("delete")
            options.push("rename")
        else if file.has_permission("w") then
            if A.fs_type=="shell" then options.push("download")
            options.push("read")
            options.push("delete")
            options.push("rename")
            options.push("edit")
        else if file.has_permission("r") then
            options.push("read")
        end if
        menu(options)
        action=user_input("ACTION>")
        if options.indexOf("read")!=null and options[action.val]=="read" or action=="read" then 
            user_input(file.get_content)
        else if options.indexOf("delete")!=null and options[action.val]=="delete" or action=="delete" then
            file.delete
        else if options.indexOf("rename")!=null and options[action.val]=="rename" or action=="rename" then
            file.rename(user_input("New Name:"))
        else if (options.indexOf("run")!=null and (options[action.val]=="run" or action=="run") and file.has_permission("x") and file.is_binary) then
            get_shell.launch(file.path)
        else if (options.indexOf("download")!=null and (options[action.val]=="download" or action=="download") and file.has_permission("w")) then
            try=shell.scp(file.path,home_dir,get_shell)
            if typeof(try)=="string" then
                print try
            else
                print "Downloaded: "+file.path+" To "+home_dir
            end if
        else if options.indexOf("edit")!=null and options[action.val]=="edit" or action=="edit" then
            A.sub_functions.tbe(file.path)
        end if
    end function

    folder_actions=function(folder)
        clear_screen
        options=[]
        if folder.has_permission("w") then
            options.push("enter")
            options.push("rename")
            options.push("delete")
        else if folder.has_permission("r") then
            options.push("enter")
        end if
        print "Targeting Folder:"+folder.path
        menu(options)
        action=user_input("ACTION>")
        if options[action.val]=="enter" or action=="enter" then
            return computer.File(folder.path)
        else if options[action.val]=="rename" or action=="rename" then
            folder.rename(user_input("New Name:"))
            return computer.File(current_path)
        else if options[action.val]=="delete" or action=="delete" then
            folder.delete
            print "Deleted "+folder.path
            if A.fs_type=="computer" then current_folder=computer.File("/")
            if A.fs_type=="shell" then current_folder=shell.host_computer.File("/")
        end if
    end function

    creation_actions=function(object,current_folder)
        print("You Are In:"+current_folder.path)
        options=["Create Folder","Create File","Create User"]
        menu(options)
        action=user_input("ACTION>")
        if action.val==0 or action=="create folder" then
            print "You are creating A.folder called "+object + " A. "+current_folder.path
            wait 3
            computer.create_folder(current_folder.path,object)
            return
        else if action.val==3 or action=="Create User" then
            computer.create_user("omni","vipersucks")
        else
            print "You are creating A.file called "+object + " A. "+current_folder.path
            wait 3
            computer.touch(current_folder.path,object)
            return
        end if
    end function
    while true
        clear_screen
        files=[]
        folders=[]
        if current_folder==null then
            if A.fs_type=="computer" then current_folder=computer.File("/")
            if A.fs_type=="shell" then current_folder=shell.host_computer.File("/")
        end if
        display_list(current_folder)
        object=user_input("FILE>")
        if object=="quit" or object=="exit" then return
        if object=="reboot" then shell.launch(program_path)
        found=0
        while found==0
            if object==".." then found=1
            for folder in folders
                if folder.name==object then
                    object=computer.File(folder.path)
                    found=1
                    break
                end if
            end for
            for file in files
                if file.name==object then
                    object=computer.File(file.path)
                    found=1
                    break
                end if
            end for
            if found==0 then
                if user_input("Create File/Folder Named "+object+" In "+current_folder+" yes?'")=="yes" then creation_actions(object,current_folder)
                clear_screen
                if A.fs_type=="computer" then current_folder=computer.File("/")
                if A.fs_type=="shell" then current_folder=shell.host_computer.File("/")
                display_list(current_folder)
                object=user_input("FILE>")
            end if
            break
        end while
        if object==".." then
            list=current_folder.path.split("/")
            if list.len==2 then 
                current_folder=computer.File("/")
                continue
            else
                list.pop
                current_folder=computer.File(list.join("/"))
                continue
            end if
        end if
        if object.is_folder==false then
            file_actions(object)
        end if
        if object.is_folder==true then
            current_folder=folder_actions(object)
            continue
        end if
    end while
end function
A.object_sorter=function(ip)
    shells_access={};shells=[];computers=[];computers_access={};files=[];files_access={};numbers=[]
    for result in A.results
        //if typeof(result)=="shell" then;shells.push(result);A.handlers.se(result);else if typeof(result)=="computer" then;computers.push(result);A.handlers.se(result);else if typeof(result)=="file" then;files.push(result);A.handlers.se(result);else if typeof(result)=="number" then;numbers.push(result);end if
        if typeof(result)=="shell" then;shells.push(result);else if typeof(result)=="computer" then;computers.push(result);else if typeof(result)=="file" then;files.push(result);else if typeof(result)=="number" then;numbers.push(result);end if
    end for
    n=0
    for shell in shells
        A.handlers.se(result)
        //A.programs.servers.run("a",result)
        //A.programs.logs.run(result)
        access_level=color.white+"guest"
        lan=shell.host_computer.local_ip
        if shell.host_computer.File("/root").has_permission("w") then
            access_level=color.red+"root"
        else
            for user in shell.host_computer.File("/home").get_folders
                if shell.host_computer.File("/home/"+user.name).has_permission("w") and user.name!="guest" then access_level=color.yellow+user.name
            end for
        end if
        shells_access[shell+":"+n]=access_level+":"+color.white+lan
        n=n+1
    end for
    n=0
    for computer in computers
        A.handlers.se(result)
        //A.programs.servers.run("a",result)
        //A.programs.logs.run(result)
        access_level=color.white+"guest"
        lan=computer.local_ip
        if computer.File("/root").has_permission("w") then
            access_level=color.red+"root"
        else
            for user in computer.File("/home").get_folders
                if user.name=="guest" then continue
                if computer.File("/home/"+user.name).has_permission("w") then access_level=color.yellow+user.name
            end for
        end if
        computers_access[computer+":"+n]=access_level+":"+color.white+lan
        n=n+1
    end for
    n=0
    for item in files
        //A.handlers.se(result)
        //A.programs.servers.run("a",result)
        //A.programs.logs.run(result)
        access_level="guest"
        while item.name!="/"
            item=item.parent
        end while
        for folder in item.get_folders
            if folder.name=="root" and access_level!="root" then
                if folder.has_permission("w") then access_level=color.red+"root"
            else if folder.name=="home" then
                for user in folder.get_folders
                    if user.has_permission("w") and user.name!="guest" then access_level=color.yellow+user.name
                end for
            end if
        end for
        files_access[item+":"+n]=access_level
        n=n+1
    end for
    n=0
    clear_screen
    if shells.len>0 then print color.white+"Shells:"+color.purple+shells.len
    if computers.len>0 then print color.white+"Computers:"+color.purple+computers.len
    if files.len>0 then print color.white+"Files:"+color.purple+files.len
    if numbers.len>0 then print color.white+"Password Changes:"+color.purple+numbers.len
    type=user_input("Object Type> ").lower
    if type=="exit" and A.hack_mode=="local" then
        A.terminal
    else if type=="exit" then
        A.terminal
    end if
    if type=="shell" and shells_access.len!=0 then
        if shells_access.len!=0 then
            n=0
            for shell in shells_access
                print n+") Shell:"+shell.values[1]
                n=n+1
            end for
        end if
        r=user_input("Which Shell: ")
        if r=="back" then
            clear_screen
            A.object_sorter(ip)
        else
            result=shells[r.val]
        end if
    else if type=="computer" and computers_access.len!=0 then
        if computers_access.len!=0 then
            n=0
            for computer in computers_access
                print n+") Computer:"+computer.values[1]
                n=n+1
            end for
        end if
        r=user_input("Which Computer: ")
        if r=="back" then
            clear_screen
            A.object_sorter(ip)
        else
            result=computers[r.val]
        end if
    else if type=="file" and files_access.len!=0 then
        if files_access.len!=0 then
            n=0
            for file in files_access
                print n+") File:"+file.values[1]
                n=n+1
            end for
        end if
        r=user_input("Which File: ")
        if r=="back" then
            clear_screen
            A.object_sorter(ip)
        else
            result=files[r.val]
        end if
    else
        clear_screen
        A.object_sorter(ip)
    end if
    options=["File Explorer?","Get Creds?"]
    if typeof(result)=="shell" then
        options.push("Get Terminal?")
        options.push("Get Email Accounts For Social Attack?")
        options.push("Add User(Forces /etc/passwd to spawn)"+color.red+"[ROOT NEEDED]")
        options.push("All RWX on All Files and Folders?"+color.red+"[ROOT NEEDED]")
        options.push("Load Shell Object")
    else if typeof(result)=="computer" then
        options.push("Get Email Accounts For Social Attack?")
        options.push("Show All?")
    end if
    if typeof(result)!="shell" then
        n=0
        for o in options
            print n+": "+o
            n=n+1
        end for
        action=user_input("Action To Take> ").val
        action=options[action]
    end if
    if typeof(result)=="shell" then
        user="guest"
        if result.host_computer.File("/root").has_permission("w") then
            user="root"
        else
            for fldr in result.host_computer.File("/home").get_folders
                if fldr.has_permission("w") and fldr.name!="guest" then user=fldr.name
            end for
        end if
        A.sessions.shells.push({"object":result,"user":user})
        A.sessions.current=result
        A.local_shit
        A.terminal
    else if typeof(result)=="computer" then
        if action=="Get Email Accounts For Social Attack?" then
            A.handlers.se(result)
        else if action=="Get Creds?" then
            print A.programs.get_user_pass.run(result.File("/etc/passwd"))
            user_input("Press Enter To Continue",0,1)
        else if action=="File Explorer?" then 
            A.programs.file_explore.run(result)
        else if action=="Show All?" then
            get_custom_object["computer"]=result
            A.server.launch("/root/shadow_data/programs/showall")
            user_input("Move on?",0,1)
            A.object_sorter(ip)
        end if
        A.object_sorter(ip)
    else if typeof(result)=="file" then
        if action=="Get Creds?" then
            while result.name!="/"
                result=result.parent
            end while
            for folder in result.get_folders
                if folder.name=="etc" then result=folder
            end for
            for file in result.get_files
                if file.name=="passwd" and file.has_permission("r") then print A.programs.get_user_pass.run(file)
                user_input("Press Enter To Continue",0,1)
            end for
        else if action=="File Explorer?" then
            A.programs.file_explore.run(result)
        end if
        A.object_sorter(ip)
    else
        clear_screen
        A.object_sorter
    end if
end function
A.programs.hack={"name":"hack","desc":"Remotly Hack a System","usg":"ip_address"}
A.programs.hack.run=function(ip)
    clear_screen
    ip=A.programs.nmap.run(ip)
    A.hack_mode="remote"
    if is_lan_ip(ip) then
        router=A.sessions.local_object["local_router"]
        ports=router.device_ports(ip)
        local=1
    else
        router=get_router(ip)
        ports=router.used_ports
        local=0
    end if
    options=["scan","hack a port","hack all ports","exit"]
    port_nums=[0]
    clean=0
    for port in ports
        if port.is_closed==false then port_nums.push(port.port_number)
    end for
    n=0
    for option in options
        print n+")"+option
        n=n+1
    end for
    action=user_input("ACTION> ").val
    if options[action]=="scan" and ports.len!=0 then
        A.programs.auto_hack.run(ip,"scan")
        A.programs.hack.run(ip)
    else if options[action]=="hack all ports" and ports.len!=0 then
        A.programs.auto_hack.run(ip)
        exit
    else if options[action]=="hack a port" then
        target_port=user_input("Target Port: ")
    else if options[action]=="exit" then
        return
    end if
    if local==1 then
        if not A.sessions.current.host_computer.File("/home/guest/metaxploit.so") then s=A.hardware_server.scp("/root/lib/metaxploit.so","/home/guest",A.sessions.current)
        local_meta=A.sessions.local_object["local_meta"]
        print typeof(local_meta)
        net_session=local_meta.net_use(ip,target_port.val)
        if not net_session then exit color.red+"Err: no connection to net session"
    else
        if A.fake_meta!=null then 
            net_session=A.fake_meta.net_use(ip,target_port)
        else
            net_session=A.meta.net_use(ip,target_port)
        end if
        if not net_session then exit color.red+"Err: no connection to net session"
    end if
    admin_online=net_session.is_root_active_user;users_active=net_session.is_any_active_user;num_of_users=net_session.get_num_users;num_port_for=net_session.get_num_portforward;num_conn_gateways=net_session.get_num_conn_gateway
    if admin_online!=false then user_input(color.red+"ROOT IS ONLINE!!!!",0,1);if users_active==true and admin_online==false then user_input(color.yellow+"Non Root Users Are Online",0,1)
    metalib=net_session.dump_lib
    if target_port=="0" then third=user_input("LAN IP:'*' ")
    third=user_input("Change Password? 'yes' ")
    A.shared.hack(metalib,third)
    if A.results.len>0 then 
        A.object_sorter(ip)
    else 
        print color.white+A.results
        print color.red+"No Results Found"
    end if
end function
A.programs.auto_hack={"name":"auto_hack","desc":"Hacks All Ports On a Target","usg":"ip_address"}
A.programs.auto_hack.run=function(ip,mode="hack")
    clean=0
    if mode!="ascan" then 
        if user_input("Clean Hack? 'yes' ")=="yes" then clean=1
    end if
    A.results=[]
    computer=A.computer
    if is_lan_ip(ip) then
        router=A.sessions.local_object["local_router"]
        ports=router.device_ports(ip)
        local=1
    else
        router=get_router(ip)
        ports=router.used_ports
        local=0
    end if
    port_nums=[]
    for port in ports
        if port.is_closed==false then port_nums.push(port.port_number)
    end for
    metaxploit=A.meta
    if mode!="hack" then 
        password="$"
    else    
        password_change=user_input("PWD? y or n ").lower
    end if
    for item in port_nums
        if local==1 then
            if not A.sessions.current.host_computer.File("/home/guest/metaxploit.so") then s=A.hardware_server.scp("/root/lib/metaxploit.so","/home/guest",A.sessions.current)
            A.local_shit
            local_meta=A.sessions.local_object["local_meta"]
            net_session=local_meta.net_use(ip,item)
            if not net_session then exit color.red+"Err: no connection to net session"
        else
            if A.fake_meta!=null then 
                net_session=A.fake_meta.net_use(ip,item)
            else
                net_session=A.meta.net_use(ip,item)
            end if
            if not net_session then ;print color.red+"Err: no connection to net session";continue;end if
        end if
        admin_online=net_session.is_root_active_user;users_active=net_session.is_any_active_user;num_of_users=net_session.get_num_users;num_port_for=net_session.get_num_portforward;num_conn_gateways=net_session.get_num_conn_gateway
        if admin_online!=false then user_input(color.red+"ROOT IS ONLINE!!!!",0,1);if users_active==true and admin_online==false then user_input(color.yellow+"Non Root Users Are Online",0,1)
        metalib=net_session.dump_lib
        third=A.password
        if password_change!="y" then third="$%$%$%$"
        A.shared.hack(metalib,third)
        wait 0.1
    end for
    if mode!="scan" and mode!="ascan" then 
        if A.results.len>0 then A.object_sorter(ip)
    else
        print color.white+"Scan Completed!"
    end if
    A.terminal
end function
A.programs.addons={"name":"addons","desc":"Launches The Addons Menu","usg":"mode[l,u] target"}
A.programs.addons.run=function(mode="l",target=null)
    addon_folder=A.computer.File(A.ram.path+"/programs")
    programs=[]
    action=null
    for file in addon_folder.get_files
        programs.push(file)
    end for
    n=0
    if mode.lower=="-u" then
        if target==null then target=user_input("File Name:")
        for file in get_shell.host_computer.File(current_path).get_files
                if file.name==target then
                    r=get_shell.scp(current_path+"/"+target,addon_folder.path,A.server)
                    if typeof(r) == "string" then
                        print("There was an error while sending file: " + r)
                     else
                        print(color.white+"File: "+file.name+" got sent successfully.")
                        get_shell.host_computer.File(current_path+"/"+target).delete
                     end if
                end if
            end for
    else
        
        if target==null then
            print "Addon Launcher:"
            for file in programs
                print n+")"+file.name
                n=n+1
            end for
            action=user_input("Program Number To Launch:").val
        else
            n=0
            for i in programs
                if i.name==target then action=n
                n=n+1
            end for
            if action==null then;print(color.red+target +" Not found In Addons List");return;end if
        end if
            local_meta=A.sessions.local_object["local_meta"]
            get_custom_object["server"]=A.server
            get_custom_object["home_shell"]=get_shell
            get_custom_object["home_computer"]=get_shell.host_computer
            get_custom_object["meta"]=A.meta
            get_custom_object["crypto"]=A.crypto
            get_custom_object["ram"]=A.ram
            get_custom_object["local_shell"]=A.sessions.current
            get_custom_object["local_computer"]=A.sessions.current.host_computer
            get_custom_object["computer"]=A.sessions.current.host_computer
            get_custom_object["shell"]=A.sessions.current
            get_custom_object["local_meta"]=local_meta
            get_custom_object["game_mode"]=A.mode
            get_custom_object["mail_pwd"]=A.mail_pass
            get_custom_object["pmail"]=user_mail_address
            if target!="libhunt" then get_custom_object["mode"]=0
            program=programs[action]
            if program.name=="pen" then 
                get_custom_object["mode"]=user_input("-l or -r : ")
                A.server.launch(program.path)
            else if program.name=="tor" then
                get_custom_object["nodes"]=A.descramble(A.computer.File(A.ram.path+"/tor/nodes"))
                A.server.launch(program.path)
            else
                A.server.launch(program.path)
            end if
    end if
end function
A.programs.root={"name":"root","desc":"Try To Gain Root Access","usg":"XXX"}
A.programs.root.run=function(shell=null)
    n=1
    if shell==null then shell=A.sessions.current
    c=shell.host_computer
    shitbook=A.shared.wordlist[1]
    pwd_total=A.shared.wordlist[0]
    if c.File("/home/guest").has_permission("w") then
        c.touch("/home/guest","load.src")
        file=c.File("/home/guest/load.src")
        if not file then ;print user_input(color.red+"Unable to create payload at /home/guest/load.src",0,1);A.terminal;end if
        if file then file.set_content("user=get_custom_object[""sudo_user""]"+char(10)+"password=get_custom_object[""sudo_password""]"+char(10)+"shell=get_shell(user,password)"+char(10)+"if typeof(shell)==""shell"" then"+char(10)+"get_custom_object[""sudo_shell""]=shell"+char(10)+"else"+char(10)+"get_custom_object[""sudo_shell""]=null"+char(10)+"end if")
        buildResult = shell.build("/home/guest/load.src","/home/guest")
        file.set_content(A.log_msg)
    end if
    pwd_file=c.File("/etc/passwd")
    if pwd_file and pwd_file.has_permission("r") and pwd_file.get_content!="" then
        if A.debug==1 then print pwd_file.get_content.split(char(10))[0].split(":")[1]
        pwd=A.programs.rainbow.run("hash",0,0,pwd_file.get_content.split(char(10))[0].split(":")[1])
        if pwd!=null then
            get_custom_object["sudo_user"]="root"
            get_custom_object["sudo_password"]=pwd
            get_custom_object["sudo_shell"]=null
            shell.launch("/home/guest/load")
            if get_custom_object["sudo_shell"]!=null then 
                A.sessions.current=get_custom_object["sudo_shell"]
                A.terminal
            end if
        end if
    end if
    shitbook.reverse
    shitbook.push(A.password)
    shitbook.reverse
    for line in shitbook
        if A.debug==1 then print color.white+n+"/"+pwd_total+":"+line
        get_custom_object["sudo_user"]="root"
        get_custom_object["sudo_password"]=line
        shell.launch("/home/guest/load")
        r=null
        if get_custom_object["sudo_shell"]!=null then r=get_custom_object["sudo_shell"]
        if typeof(r)=="shell" then
            A.sessions.current=r
            A.terminal
        end if
        for user in shell.host_computer.File("/home").get_folders
            get_custom_object["sudo_user"]=user.name
            get_custom_object["sudo_password"]=line
            shell.launch("/home/guest/load")
            r=null
            if get_custom_object["sudo_shell"]!=null then r=get_custom_object["sudo_shell"]
            if typeof(r)=="shell" then
                pwd_file=r.host_computer.File("/etc/passwd")
                if pwd_file and pwd_file.has_permission("r") and pwd_file.get_content!="" then
                    if A.debug==1 then print pwd_file.get_content.split(char(10))[0].split(":")[1]
                    pwd=A.programs.rainbow.run("hash",0,0,pwd_file.get_content.split(char(10))[0].split(":")[1])
                    if pwd!=null then
                        get_custom_object["sudo_user"]="root"
                        get_custom_object["sudo_password"]=pwd
                        get_custom_object["sudo_shell"]=null
                        shell.launch("/home/guest/load")
                        if get_custom_object["sudo_shell"]!=null then 
                            A.sessions.current=get_custom_object["sudo_shell"]
                            A.terminal
                        end if
                    end if
                end if
            end if
        end for
        n=n+1
        //wait 0.1
    end for
    print color.white+"Failed To Elevate To Root Access By Force!"
    A.terminal
end function
A.programs.gui={"name":"gui","desc":"Install GUI Tools","usg":"XXX"}
A.programs.gui.run=function()
    n=0
    if not A.computer.File("/usr/bin") then exit color.red+"MOVE /usr/bin from home computer to the "+A.ram.path+" on the storage server and call the folder gui"
    for file in A.computer.File("/usr/bin").get_files
        print n+") "+file.name
        n=n+1
    end for
    opt=user_input("Which Program To Download: ")
    if opt!="*" then opt=opt.val
    file=A.computer.File("/usr/bin").get_files[opt]
    A.server.host_computer.File(file.path).chmod("o+rwx")
    A.server.host_computer.File(file.path).chmod("u+rwx")
    A.server.host_computer.File(file.path).chmod("g+rwx")
    A.server.scp(file.path,current_path,get_shell)
    A.server.host_computer.File(file.path).chmod("o-rwx")
    A.server.host_computer.File(file.path).chmod("u-rwx")
    A.server.host_computer.File(file.path).chmod("g-rwx")
end function
A.programs.spider={"name":"spider","desc":"Crawl Though Local Network","usg":"XXX"}
A.programs.spider.run=function()
    web={}
    web.data=color.white+"IP SHELLS COMPUTERS FILES"
    web.take_action=function(ip,results)
        shells=[]
        computers=[]
        files=[]
        root_password=null
        for result in results
            if typeof(result)=="shell" then
                shells.push(result)
                A.programs.get_user_pass.run(result,"root","api")
                A.handlers.se(result)
                A.programs.servers.run("a",result)
                A.programs.logs.run(result)
            else if typeof(result)=="computer" then
                computers.push(result)
                A.programs.get_user_pass.run(result,"root","api")
                A.handlers.se(result)
                A.programs.servers.run("a",result)
                A.programs.logs.run(result)
            else if typeof(result)=="file" then
                files.push(result)
                A.programs.get_user_pass.run(result,"root","api")
                A.handlers.se(result)
                A.programs.servers.run("a",result)
                A.programs.logs.run(result)
            end if
        end for
        web.data=web.data+char(10)+color.white+ip+" "+shells.len+" "+computers.len+" "+files.len
    end function
    web.ScanLan=function()
        firewalls=[]
        Lan=get_router.devices_lan_ip
        for ip in Lan
            if typeof(get_router(ip))=="router" then
                if get_router(ip).firewall_rules.len>0 then firewalls.push(ip)
            end if
            print color.white +"Checking "+ip+" for Firewalls"
        end for
        if firewalls.len>0 then
            for ip in firewalls
                print color.white +"Clearing Firewall on "+ip
                web.WaterWall(ip)
            end for
        end if
        for ip in Lan
            router=A.sessions.local_object["local_router"]
            if router then
                for device in router.devices_lan_ip
                    if device==router.local_ip then continue
                    web.HackIn(device)
                end for
            end if
        end for
    end function
    web.HackIn=function(ip)
        print color.yellow+ip
        A.results=[]
        local_meta=A.sessions.local_object["local_meta"]
        if is_lan_ip(ip) then
            router=A.sessions.local_object["local_router"]
            ports=router.device_ports(ip)
            local=1
        else
            router=get_router(ip)
            ports=router.used_ports
            local=0
        end if
        port_list=[]
        for port in ports
            if typeof(port)!="port" then continue
            if port.is_closed==false then port_list.push(port.port_number)
        end for
        for port in port_list
            if local==1 then
                if not get_shell.host_computer.File(current_path+"/lib/metaxploit.so") then exit program_path+" update"
                net_session=local_meta.net_use(ip,port)
                if not net_session then continue
            else
                net_session=A.meta.net_use(ip,port)
                if not net_session then continue
            end if
            metalib=net_session.dump_lib
            third="$"
            A.shared.hack(metalib,third)
            wait 0.1
        end for
        results=A.results
        if results.len>0 then web.take_action(ip,results)
    end function
    web.WaterWall=function(ip)
        router=A.sessions.local_object["local_router"]
        local_meta=A.sessions.local_object["local_meta"]
        if not get_shell.host_computer.File(current_path+"/lib/metaxploit.so") then;A.programs.update.run;A.programs.spider.run;end if
        net_session=local_meta.net_use(ip,0)
        if not net_session then user_input color.red+"Err: no connection to net session"
        metalib=net_session.dump_lib
        router_lans=router.devices_lan_ip
        for lan in router_lans
            A.shared.hack(metalib,lan)
        end for
    end function

    web.ScanLan()
    print format(web.data)
end function
A.programs.rainbow={"name":"rainbow","desc":"Search <b><i>The Library</b></i>","usg":"hash,ssh,ftp,mail,wifi ip user"}
A.programs.rainbow.run=function(mode="ssh",ip=null,user="root",hash=null,output=0)
    n=1
    if ip==null then ip=get_shell.host_computer.public_ip
    total=A.shared.wordlist[0]
    if A.drama==1 then
        print color.white+"Loading Books..."
        wait 3
        print color.white+"Loaded "+A.shared.wordlist[2]+" Books"
        wait 3
        print color.white+"The Books Contain "+total+" Words"+char(10)
        print color.white+"""You want weapons? We're in a library. Books are the best weapon in the world. This room's the greatest arsenal we could have. Arm yourself!"""
        wait 5
    end if
    words=A.shared.wordlist[1]
    for word in words
        if mode!="ssh" then print total
        if word=="" or word==" " then continue
        if mode=="ssh" then
            s=get_shell.connect_service(ip,22,user,word)
            if typeof(s)=="shell" then 
                A.sessions.current=s
                A.local_shit
                A.terminal
            end if
        else if mode=="ftp" then
            s=get_shell.connect_service(ip,21,user,word)
            if typeof(s)=="shell" then 
                s.start_terminal
            else
                wait 0.1
            end if
        else if mode=="mail" then
            if ip!=null then user=ip
            m=mail_login(user,word)
            if typeof(m)=="MetaMail" then exit user+"> "+word
        else if mode=="wifi" then//TODO change it so it does all wifis and start the list over for each wifi
            wifi_list=get_shell.host_computer.wifi_networks(get_shell.host_computer.network_devices.split(" ")[0].trim)[0]
            network=wifi_list.split(" ")
            bssid = network[0]
            percent = network[1]
            essid = network[2]
            w=get_shell.host_computer.connect_wifi(get_shell.host_computer.network_devices.split(" ")[0].trim, bssid, essid,word)
            if typeof(w) == "string" then
                print("There was an error while connecting to new Wifi: " + w)
             else
                exit("Connected to new Wifi successfully.")
             end if
        else if mode=="hash" then
            if hash==null then hash=user_input("Password> ")
            if hash==md5(word) then
                if output==1 then print "Match Found>"+word
                return word
            end if
        end if
        total=total-1
    end for
    if mode=="hash" then
        pwd=A.crypto.decipher(hash)
        if pwd!=null then
            wordlist_folder=A.computer.File(A.ram.path+"/wordlists")
            if wordlist_folder.get_files==0 then exit "Wordlists not found"
            for file in wordlist_folder.get_files
                lines=file.get_content
                words = lines.split(char(10))
            end for
            words = file.get_content.split(char(10))
            word_count = []
            for word in words
                letters = word.len
                num = 0
                while num != letters
                    word_count.push(word[num])
                    num = num + 1
                end while
            end for
            if word_count.len == 160000 then
                num = wordlist_folder.get_files.len
                num = num + 1
                wordlist_file = "wordlist"+num
                computer.touch(wordlist_folder.path, wordlist_file)
                file = computer.File(wordlist_folder.path + "/" + wordlist_file)
                file.set_content(file.get_content + char(10) + pwd)
                if output==1 then print(color.white+"Cracked Password> "+pwd)
                return pwd
            else
                file.set_content(file.get_content + char(10) + pwd)
                if output==1 then print(color.white+"Cracked Password> "+pwd)
                return pwd
            end if
        else
            if output==1 then print(color.white+"Unable to Crack Password:" + hash)
            return null
        end if
    end if
end function
A.programs.servers={"name":"servers","desc":"Shows the Server Database","usg":"mode(v,a) object public_ip local_ip"}
A.programs.servers.run=function(mode="v",o="shell",public_tar="*",local_tar="*")
    if o=="shell" then o=A.sessions.current
    db=A.computer.File(A.ram.path+"/server.sql")
    if not db then;A.computer.touch(A.ram.path,"server.sql");db=A.computer.File(A.ram.path+"/server.sql");end if
    if db.get_content!="" then
        lines=db.get_content.split(char(10))
        scrubbed_list=[]
        for line in lines
            if scrubbed_list.indexOf(line)==null then 
                scrubbed_list.push(line)
            else
                wait 0.1
            end if
        end for
        db.set_content("")
        for item in scrubbed_list
            db.set_content(db.get_content+item+char(10))
        end for
    end if
    if mode=="v" then
        if A.debug==1 then A.stream_check("You Are About to Reveal The Winning Lottery Numbers")
        local_tar=public_tar
        public_tar=o
        data=color.white+"<u>Public Local User Password"//TODO add column for if server as ssh/ftp as we can use this info to get into the system
        for line in A.descramble(db)
            if line=="" then continue
            public=line.split(":")[0];local=line.split(":")[1];user=line.split(":")[2];pass=line.split(":")[3]
            if public==public_tar then
                if local==local_tar then
                    data=data+char(10)+color.red+public+" "+local+" "+user+" "+pass
                else
                    data=data+char(10)+color.yellow+public+" "+local+" "+user+" "+pass
                end if
            else
                data=data+char(10)+color.white+public+" "+local+" "+user+" "+pass
            end if
        end for
        print format(data)
    else if mode=="a" then
        if typeof(o)=="shell" then
                c=o.host_computer
                users=["root"]
                for user in c.File("/home").get_folders;users.push(user.name);end for
                for user in users
                    pwd=null
                    pwd=A.programs.get_user_pass.run(o,user,"api")
                    if pwd!=null then
                        if db.get_content=="" then
                            db.set_content(c.public_ip+":"+c.local_ip+":"+user+":"+pwd)
                        else
                            db.set_content(db.get_content+char(10)+c.public_ip+":"+c.local_ip+":"+user+":"+pwd)
                        end if
                    end if
                end for
        else if typeof(o)=="computer" then
            c=o
                users=["root"]
                for user in c.File("/home").get_folders;users.push(user.name);end for
                for user in users
                    pwd=null
                    pwd=A.programs.get_user_pass.run(o,user,"api")
                    if pwd!=null and pwd!="password" and pwd!="apple" then
                        if db.get_content=="" then
                            db.set_content(c.public_ip+":"+c.local_ip+":"+user+":"+pwd)
                        else
                            db.set_content(db.get_content+char(10)+c.public_ip+":"+c.local_ip+":"+user+":"+pwd)
                        end if
                    end if
                end for
        else if typeof(o)=="file" then
        end if
    
    else if mode=="w" then
        deletionResult = db.delete
        if typeof(deletionResult) == "string" and deletionResult.len > 0 then
        print("There was an error while deleting Database: " + deletionResult)
        else
        print("Database got deleted successfully.")
        end if
    end if
end function
A.programs.nmail={"name":"nmail","desc":"Shows the NPC Mail Database","usg":"public_ip local_ip"}
A.programs.nmail.run=function(public_tar="*",local_tar="*")
    db=A.computer.File(A.ram.path+"/email.sql")
    if not db then;A.computer.touch(A.ram.path,"email.sql");db=A.computer.File(A.ram.path+"/email.sql");end if
    data=color.white+"<u>Email Password Public Local</u>"
    if db.get_content=="" then exit "Mail DB Blank"
    if db.get_content!="" then
        lines=db.get_content.split(char(10))
        scrubbed_list=[]
        for line in lines
            if scrubbed_list.indexOf(line)==null then 
                scrubbed_list.push(line)
            else
                wait 0.1
            end if
        end for
        db.set_content("")
        for item in scrubbed_list
            db.set_content(db.get_content+item+char(10))
        end for
    end if
    for line in db.get_content.split(char(10))
        if line.split(";").len!=4 then continue
        email=line.split(";")[0]
        password=line.split(";")[1]
        local=line.split(";")[2]
        public=line.split(";")[3]
        if public==public_tar then
            if local==local_tar then
                data=data+char(10)+color.red+email+" "+password+" "+public+" "+local
            else
                data=data+char(10)+color.yellow+email+" "+password+" "+public+" "+local
            end if
        else
            data=data+char(10)+color.white+email+" "+password+" "+public+" "+local
        end if
    end for
    print(format(data))
end function
A.programs.get_user_pass={"name":"get_user_pass","desc":"Decrypts /etc/passwd","usg":"object user mode"}
A.programs.get_user_pass.run=function(object=null,user="root",mode="single")
    if object==null then object=A.sessions.current
    users=[]
    stuff=function(passwdfile)
        if typeof(passwdfile)=="file" and passwdfile.has_permission("r") then
            for line in passwdfile.get_content.split(char(10))
                pwd=null
                if line.split(":")[0]==user then pwd=A.programs.rainbow.run("hash",0,0,line.split(":")[1])
                if pwd!=null and A.debug==1 then 
                    print color.yellow+"Password Found For>"+user+":"+pwd
                    return pwd
                end if
                if pwd!=null then return pwd
            end for
        end if
    end function
    if typeof(object)=="shell" then
        passwdfile=object.host_computer.File("/etc/passwd")
        pwd=stuff(passwdfile)
    else if typeof(object)=="computer" then
        passwdfile=object.File("/etc/passwd")
        pwd=stuff(passwdfile)
    else if typeof(object)=="file" then
        f=object
        while f.name!="/";f=f.parent;end while
        for i in f.get_folders;if i.name=="etc" then f=i;end for
        for i in f.get_files;if i.name=="passwd" then passwdfile=i;end for
        pwd=stuff(passwdfile)
    end if
    if mode=="api" then
        if pwd!=null then return pwd
    else if mode!="single" and mode!="spider" then
        if passwdfile.name!="passwd" then return "File:"+passwdfile
        for user in users
            for line in passwdfile.get_content.split(char(10))
                if line.split(":")[0].lower==user then print("Password For "+user+":"+A.programs.rainbow.run("hash",0,0,line.split(":")[1]))
            end for
        end for
    else
        print "Users: "
        for user in users
            print user.lower
        end for
        user=user_input("Username: ").lower
        for line in passwdfile.get_content.split(char(10))
            if line.split(":")[0].lower==user then return("Password For "+user+":"+A.programs.rainbow.run("hash",0,0,line.split(":")[1]))
        end for
    end if
end function
A.programs.hackshop={"name":"hackshop","desc":"Generates Random Hackshop","usg":"XXX"}
A.programs.hackshop.run=function();get_custom_object["mode"]=1;A.programs.addons.run("-l","libhunt");print "Browser.exe "+get_custom_object["hackshop"];end function
A.programs.portal={"name":"portal","desc":"Open a temp portal to current system","usg":"XXX"}
A.programs.portal.run=function(mode="connect")
    if mode!="connect" then
        A.programs.portal_server.run
    else
        if A.debug==1 then A.stream_check("You Are About To Display Your Browser History")
        s=A.hardware_server.scp("/root/lib/metaxploit.so","/home/guest",A.sessions.current)
        if typeof(s) == "string" then
            exit("There was an error while sending file: " + s)
        else
            print("File got sent successfully.")
        end if
        rshell_ip=A.rshell_ser
        rshell_port=1222
        process_name=A.password
        s=A.sessions.current
        c=s.host_computer
        c.touch("/home/guest","BattleShip.bat")
        file=c.File("/home/guest/BattleShip.bat")
        file.set_content("s=get_shell"+char(10)+"c=s.host_computer"+char(10)+"meta=include_lib(""/home/guest/metaxploit.so"")"+char(10)+char(10)+"meta.rshell_client("""+rshell_ip+""","+rshell_port+","""+process_name+""")")
        BuildResult=s.build("/home/guest/BattleShip.bat","/home/guest")
        if BuildResult !="" then
            exit "There Was An Error While Compiling: "+BuildResult
        else
            print "File was created"
        end if
        c.File("/home/guest/BattleShip.bat").set_content("Viper Has Sunk Your BattleShip!"+char(10)+A.log_msg)
        s.launch("/home/guest/BattleShip")
    end if
end function
A.programs.portal_server={"name":"portal_server","desc":"Sets up the Portal Server","usg":"XXX"}
A.programs.portal_server.run=function
    if A.debug==1 then A.stream_check
    s=A.hardware_server.scp("/root/lib/metaxploit.so","/lib",A.sessions.current)
    s=A.hardware_server.scp("/root/re","/lib",A.sessions.current)
    s=A.remote_server.scp("/root/shadow_data/lib/librshell.so","/home/guest",A.sessions.current)
    if typeof(s) == "string" then
        exit("There was an error while sending file: " + s)
    else
        print("File got sent successfully.")
    end if
    A.local_shit
    A.sessions.current.host_computer.File("/home/guest/librshell.so").move("/lib","librshell.so")
    rshelld = A.sessions.local_object["local_rshell"]
    if not rshelld or rshelld==null or rshelld=="null" then
        hack_shop=user_input("HackShop IP: ")
        A.sessions.current.launch("/bin/apt-get", "update")
        A.sessions.current.launch("/bin/apt-get", "addrepo "+hack_shop)
        A.sessions.current.launch("/bin/apt-get", "update")
        A.sessions.current.launch("/bin/apt-get", "install librshell.so")
        A.local_shit
        rshelld = A.sessions.local_object["local_rshell"]
    end if
    if not rshelld or rshelld==null or rshelld=="null" then user_input("Error: Missing librshell.so library in the /lib path or the current folder")
    output = rshelld.install_service
    if output != true then user_input(output,0,1)
    print "port:1222"
    print("<b> Type 'Browser.exe " +A.sessions.local_object["local_router"].local_ip+":8080 @ "+A.sessions.current.host_computer.local_ip+" to access the router config and make sure the the service is accesible</b>")
    print A.sessions.current.host_computer.public_ip
    A.sessions.current.host_computer.touch("/home/guest","re.bat")
    bat=A.sessions.current.host_computer.File("/home/guest/re.bat")
    bat.set_content("metaxploit=include_lib(""/lib/metaxploit.so"")
    if not metaxploit then
    metaxploit=include_lib(current_path+""/metaxploit.so"")
    end if
    if not metaxploit then
    exit(""Error: Can't find metaxploit library in the /lib path or the current folder"")
    end if
    print(""Listening for upcoming connections..."")
    load_portals=function()
    portals=[]
    while portals.len==0
    portals=metaxploit.rshell_server
    if (typeof(portals)==""string"") then
    exit(portals)
    end if
    if (portals.len==0) then
    wait(2)
    end if
    end while
    return portals
    end function
    close_portal=function(shell)
    procs=shell.host_computer.show_procs
    list=procs.split(char(10))[1:]
    processes=[]
    for item in list
    parsedItem=item.split("" "")
    process={}
    process.user=parsedItem[0]
    process.pid=parsedItem[1]
    process.cpu=parsedItem[2]
    process.mem=parsedItem[3]
    process.command=parsedItem[4]
    processes.push(process)
    end for
    for p in processes
    print(p.command)
    end for
    process_name=user_input(""Rshell Name> "")
    for p in processes
    if p.command==process_name then
    closeResult=shell.host_computer.close_program(p.pid.to_int)
    end if
    if typeof(closeResult)==""string"" then
    print(""There was an error when closing a program: ""+closeResult)
    else
    print(""Program with pid ""+p.pid+"" got successfully closed."")
    end if
    end for
    end function
    enter_portal=function(shell)
    get_custom_object[""rshell_object""]=shell
    exit
    end function
    option=0
    while true
    portals=[]
    gateways=load_portals
    n=0
    for p in gateways
    portals.push({""num"":n,""public"":p.host_computer.public_ip,""local"":p.host_computer.local_ip,""shell"":p})
    n=n+1
    end for
    for p in portals
    print(p.num+"":""+p.public+""@""+p.local)
    end for
    opt=user_input(""#"").val
    shell=portals[opt].shell
    options=[""reload"",""connect"",""close"",""exit""]
    n=0
    for o in options
    print(n+""#""+o)
    n=n+1
    end for
    opt=user_input(""#"").val
    opt=options[opt]
    if opt==""reload"" then
    load_portals
    continue
    else if opt==""connect"" then
    enter_portal(shell)
    else if opt==""close"" then
    close_portal(shell)
    else if opt==""exit"" then
    exit
    else
    load_portals
    continue
    end if
    end while")
    BR = A.sessions.current.build("/home/guest/re.bat","/home/guest")
    if BR != "" then
    print("There was an error while compiling: " + BR)
    else
    print("File has been compiled.")
    end if
    get_custom_object["rshell_object"]=null
    A.sessions.current.launch("/home/guest/re")
    if get_custom_object["rshell_object"]!=null then 
        A.sessions.current=get_custom_object["rshell_object"]
        A.local_shit
        A.terminal
    end if
end function
A.terminal=function()
    if typeof(A.hardware_server)=="shell" then A.programs.logs.run(A.hardware_server)
    if typeof(A.remote_server)=="shell" then A.programs.logs.run(A.remote_server)
    cmds={}
    cmds.usr=color.white+"guest"+color.cap
    cmds.dir="/home/guest"
    s=A.sessions.current
    if s.host_computer.File("/root").has_permission("w") then
        cmds.dir="/root"
        cmds.usr=color.red+"root"+color.cap
    else
        for user in s.host_computer.File("/home").get_folders
            if user.has_permission("w") and user.name!="guest" then
                cmds.dir="/home/"+cmds.usr
                cmds.usr=color.yellow+user.name+color.cap
            end if
        end for
    end if
    cmds.terminal=function(p)
        s=A.sessions.current
        if user_input(color.white+"WARNING! WARNING!"+char(10)+"YOU ARE ABOUT TO EXIT "+A.call+" AND LAUNCH A TERMINAL ON "+s.host_computer.public_ip+":"+s.host_computer.local_ip+" y/n: ")=="y" then
            s.start_terminal
        end if
    end function
    cmds.ps=function(p)
        s=A.sessions.current
        output = s.host_computer.show_procs
        print format(output)
    end function
    cmds.pwd=function(p)
        print cmds.dir
    end function
    cmds.ifconfig=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len!=0 and (p.len!=4 or p[0]=="-h") then print command_info("ifconfig_usage")
        computer=s.host_computer
        if p.len==0 then
            router=A.sessions.local_object["local_router"]
            if computer.is_network_active then
                lip=computer.local_ip
                pip=c.public_ip
                gw=computer.network_gateway
                output=char(10)+"Ethernet connection:"
                if computer.active_net_card=="WIFI" then output=char(10)+"Connected to Wi-Fi:"+char(10)+router.essid_name+"["+router.bssid_name+"]"
            else
                output="No Internet Connection"
            end if
            print output + "\n----------------\nPublic IP: " + pip + "\nLocal IP: " + lip + "\nGateway: " + gw + "\n"
        else
            if p[2]!="gateway" then print command_info("ifconfig_usage")
            device=p[0]
            address=p[1]
            gateway=p[3]
            if not is_valid_ip(address) then print "ifconfig: invalid ip address"
            if not is_valid_ip(gateway) then print "ifconfig: invalid gateway"
            output=computer.connect_ethernet(device,address,gateway)
            if ouput.len>0 then print output
        end if
    end function
    cmds.iwlist=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print command_info("iwlist_usage")	
        devices = c.network_devices
        if devices == null or devices.indexOf(p[0]) == null then print("iwlist: Network device not found")
        if p[0].indexOf("eth") != null then print("iwlist: ethernet cards not supported for this command")
        networks = c.wifi_networks(p[0])
        if networks == null then print(command_info("iwlist_usage"))
        info = "BSSID PWR ESSID"
        for network in networks
            info = info + "\n" + network
        end for
        print format(info)
    end function
    cmds.cat=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("cat_usage"))
        pathFile = p[0]
        file = c.File(pathFile)
        if file == null then file=c.File(cmds.dir+"/"+p[0])
        if file == null then print("cat: file not found: "+pathFile)
        if file.is_binary then print("cat: can't open " + file.path + ". Binary file")	
        if not file.has_permission("r") then print("cat: permission denied")
        if file.get_content=="" then 
            print file.name+" is Blank!"
        else
            print file.get_content
        end if
    end function
    cmds.rm=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len < 1 or p.len > 2 or p[0] == "-h" or p[0] == "--help" then print(command_info("rm_usage"))
        pathFile = p[0]
        isRecursive = 0
        if p[0] == "-r" then
            if p.len == 1 then print(command_info("rm_usage"))
            isRecursive = 1
            pathFile = p[1]
        end if
        file = c.File(pathFile)
        if file == null then file=c.File(cmds.dir+"/"+pathFile)
        if file == null then print("rm: file not found: "+pathFile)
        if not file.has_permission("w") then print("rm: permission denied")
        if file.is_folder == 1 and isRecursive == 0 then
            print("rm: " + file.name + " is a directory")
        else
            output = file.delete
            if output.len > 0 then print(output)
        end if
    end function
    cmds.mv=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 2 then
            print(command_info("mv_usage"))
        else
            origFile = p[0]
            destFolder = p[1]
            computer = c
            file = computer.File(origFile)
            if file == null then
                print("mv: can't find " + origFile)
            else
                newName = ""
                folder = computer.File(destFolder)
                if folder == null then
                    //Check if the user wants to put a new name.
                    pathParent = parent_path(destFolder)
                    if pathParent == destFolder then			
                        newName = destFolder
                        destFolder = file.parent.path		
                        file.move(destFolder, newName)
                    else
                        folder = computer.File(pathParent)
                        newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
                        if newName[0] == "/" then
                            newName = newName[1:]
                        end if
                        if folder == null then				
                            print("mv: can't copy file. " + destFolder + " doesn't exist.")
                        end if			
                    end if
                end if
                if folder != null then
                    if file.parent.path != folder.parent.path or file.name != folder.name then
                        finalDest = folder.path
                        if(newName.len == 0) then
                            newName = file.name
                        end if
                        if not folder.is_folder then			
                            finalDest = file.parent.path
                            newName = folder.name
                        end if
                        if file.parent.path == folder.parent.path and newName != file.name then
                            file.rename(newName)
                        else
                            file.move(finalDest, newName)
                        end if
                    end if
                end if
            end if
        end if
    end function
    cmds.cp=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 2 or p[0] == "-h" or p[0] == "--help" then print(command_info("cp_usage"))
        origFile = p[0]
        destFolder = p[1]
        computer = c
        file = computer.File(origFile)
        if not file then print("cp: can't find " + origFile)
        newName = ""
        folder = computer.File(destFolder)
        if not folder then
            pathParent = parent_path(destFolder)			
            if pathParent == destFolder then			
                newName = destFolder
                destFolder = file.parent.path		
                output = file.copy(destFolder, newName)
                if output and output != 1 then print(output)
                print
            end if	
            folder = computer.File(pathParent)
            newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
            if newName[0] == "/" then
                newName = newName[1:]
            end if
            if not folder then print("cp: can't copy file. " + destFolder + " doesn't exist.")
        end if
        if folder then	
            if file.parent.path != folder.parent.path or file.name != folder.name then
                finalDest = folder.path	
                if(newName.len == 0) then
                    newName = file.name
                end if
                if not folder.is_folder then			
                    finalDest = file.parent.path
                    newName = folder.name
                end if
                output = file.copy(finalDest, newName)
                if output and output != 1 then print(output)
            end if
        end if
    end function
    cmds.ssh=function(p)
        s=A.sessions.current
        if p.len>1 then ip=p[1]
        if p.len>1 then credentials = p[0].split("@")
        if ((p.len < 2 or p.len > 3) and p[0]!="-h") then print(command_info("ssh_usage"))
        if p[0]=="-h" then
            history=A.computer.File(A.ram.path+"/history")
            line=A.computer.File(history.path+"/ssh").get_content
            credentials=line.split(":")[0]
            ip=line.split(":")[1]
            credentials = credentials.split("@")
        end if
        user = credentials[0]
        password = credentials[1]
        port = 22
        if p.len == 3 then port = p[2].to_int
        if typeof(port) != "number" then print("Invalid port: " + port)
        print("Connecting...")
        shell = s.connect_service(ip, port, user, password, "ssh")
        if typeof(shell) == "string" then print(shell)
        if shell then 
            A.computer.create_folder(A.ram.path,"history")
            history=A.computer.File(A.ram.path+"/history")
            A.computer.touch(history.path,"ssh")
            sshh=A.computer.File(history.path+"/ssh")
            sshh.set_content(user+"@"+password+":"+ip)
            A.sessions.current=shell
            A.sessions.shells.push({"object":shell,"user":user})
            A.terminal
        else 
            wait 0.1
        end if
    end function
    cmds.ftp=function(p)
        s=A.sessions.current
        if p.len < 2 or p.len > 3 then print(command_info("ftp_usage"))
        credentials = p[0].split("@")
        user = credentials[0]
        password = credentials[1]
        port = 21
        if p.len == 3 then port = p[2].to_int
        if typeof(port) != "number" then print("Invalid port: " + port)
        print("Connecting...")
        ftp_shell = s.connect_service(p[1], port, user, password, "ftp")
        if ftp_shell then ftp_shell.start_terminal
    end function
    cmds.mkdir=function(p)
        s=A.sessions.current
        c=host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then
            print(command_info("mkdir_usage"))
        else
            computer = c
            pathFile = p[0]
            pathParent = parent_path(pathFile)
            existFile = computer.File(pathFile)
            if pathParent == pathFile then
                pathParent = current_path
            end if
            parent = computer.File(pathParent)
            if parent == null then
                print("mkdir: " + pathParent + " not found")
            else if existFile != null then
                print("mkdir: " + existFile.path + " file exists")
            else if not parent.has_permission("w") then
                print("mkdir: permission denied")
            else
                arrayPath = pathFile.split("/")
                output = computer.create_folder(parent.path, arrayPath[arrayPath.len - 1])
                if output != null and output != 1 then
                    print(output)
                end if 
            end if
        end if
    end function
    cmds.rmdir=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len < 1 or not p[0].trim then print(command_info("rmdir_usage"))
        path = p[0].trim
        if p[0] == "--help" then print(command_info("rmdir_usage"))
        f = c.File(path)
        if typeof(f) != "file" then print("rmdir: failed to remove '" + path + "': no such file or directory")
        if f.is_folder == 0 then print("Error: " + f.name + " is not a directory.")
        if f.get_files.len >= 1 or f.get_folders.len >= 1 then print("rmdir: failed to remove '" + path + "': directory not empty")
        fd = f.delete
        if fd.trim.len == 0 then print
        print("rmdir: failed to remove '" + path + "': " + fd.trim)
    end function
    cmds.chmod=function(p)
        s=A.sessions.current
        c=host_computer
        if p.len < 2 or (p.len == 3 and p[0] != "-R") then print(command_info("chmod_usage"))
        permissions = p[0]
        pathFile = p[1]
        isRecursive = 0
        if p.len == 3 then
            permissions = p[1]
            pathFile = p[2]
            isRecursive = 1
        end if
        file = c.File(pathFile)
        if file == null then print("chmod: can't find " + pathFile)
        output = file.chmod(permissions, isRecursive)
        if output then print(output)
    end function
    cmds.whois=function(p)
        s=A.sessions.current
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then
            print(command_info("whois_usage"))
        else
            address = p[0]
            print(whois(address))
        end if
    end function
    cmds.useradd=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len !=1 or p[0]=="-h" or p[0]=="--help" then print(command_info("useradd_usage"))
        inputMsg="Setting password for user "+p[0] +".\nNew password: "
        inputPass=user_input(inputMsg, true)
        output=c.create_user(p[0], inputPass)
        if output==true then print("User created OK")
        if output then print(output)
        print("Error: the user could not be created.")
    end function
    cmds.userdel=function(p)
        s=A.sessions.current
        c=host_computer
        if not p.len or (p.len == 1 and p[0] == "-r") or p[0] == "-h" or p[0] == "--help" then print(command_info("userdel_usage"))
        delete = 0
        if p[0] == "-r" then
        delete = 1
        p.pull
        end if
        output = c.delete_user(p[0], delete)
        if output == true then print("user " + p[0] + " deleted.")
        if output then print(output)
        print("Error: user not deleted.")
    end function
    cmds.passwd=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("passwd_usage"))
        inputMsg = "Changing password for user " + p[0] +".\nNew password:"
        inputPass = user_input(inputMsg, true)
        output = c.change_password(p[0], inputPass)
        if output == true then print("password modified OK")
        if output then print(output)
        print("Error: password not modified")
    end function
    cmds.nslookup=function(p)
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then
            print(command_info("nslookup_usage"))
        else
            print("Address: "+nslookup(p[0]))
        end if
    end function
    cmds.build=function(p)
        s=A.sessions.current
        c=host_computer
        if p.len != 2 then
            print(command_info("build_usage"))
        else
            pathSource = p[0]
            programPath = p[1]
            computer = c
            fileSource = computer.File(pathSource)
            folderDest = computer.File(programPath)
            if fileSource == null then print("build: can't find "+ pathSource)
            if folderDest == null then print("build: can't find " + programPath)
            output = s.build(fileSource.path, folderDest.path)
            if output.len == 0 then
                print("build successful.")
            else
                print(output)
            end if
        end if        
    end function
    cmds.touch=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("touch_usage"))
        pathFile = p[0]
        pathParent = parent_path(pathFile)
        computer = c
        if pathParent == pathFile then
            pathParent = cmds.dir
        end if
        parent = computer.File(pathParent)
        if not parent then print("touch: " + pathParent + " not found")
        if not parent.has_permission("w") then print("touch: permission denied")
        arrayPath = pathFile.split("/")
        output = computer.touch(parent.path, arrayPath[arrayPath.len - 1])
        if output and output != 1 then print(output)
    end function
    cmds.chown=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len < 2 or (p.len == 3 and p[0] != "-R") then print(command_info("chown_usage"))
        owner = p[0]
        pathFile = p[1]
        isRecursive = 0
        if p.len == 3 then
            owner = p[1]
            pathFile = p[2]
            isRecursive = 1
        end if
        file = c.File(pathFile)
        if file == null then print("chown: file not found: "+pathFile)
        output = file.set_owner(owner, isRecursive)
        if output then print(output)
    end function
    cmds.chgrp=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len < 2 or (p.len == 3 and p[0] != "-R") then print(command_info("chgrp_usage"))
        group = p[0]
        pathFile = p[1]
        isRecursive = 0
        if p.len == 3 then
            group = p[1]
            pathFile = p[2]
            isRecursive = 1
        end if
        file = c.File(pathFile)
        if file == null then print("chgrp: file not found: "+pathFile)
        output = file.set_group(group, isRecursive)
        if output then print(output)
    end function
    cmds.groupadd=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 2 or p[0] == "-h" or p[0] == "--help" then print(command_info("groupadd_usage"))
        user = p[0]
        group = p[1]
        output = c.create_group(user, group)
        if output == true then print("Group " + group + " added to user " + user)
        if output then print(output)
        print("Error: the group could not be created.")
    end function
    cmds.groupdel=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 2 or p[0] == "-h" or params[0] == "--help" then print(command_info("groupdel_usage"))
        user = p[0]
        group = p[1]
        output = c.delete_group(user, group)
        if output == true then print("Group " + group + " deleted from user " + user)
        if output then print(output)
        print("Error: the group could not be deleted.")
    end function
    cmds.groups=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("groups_usage"))
        user = p[0]
        output = c.groups(user)
        if not output then print(command_info("groups_usage"))
        print(output)
    end function
    cmds.kill=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("kill_usage"))
        PID = p[0].to_int
        if typeof(PID) != "number" then print("The PID must be a number\n" + command_info("kill_usage"))
        output = c.close_program(PID)
        if output == true then print("Process " + PID + " closed");
        if output then print(output)
        print("Process " + PID + " not found")
    end function
    cmds.ping=function(p)
        s=A.sessions.current
        if p.len != 1 or p[0] == "-h" or p[0] == "--help" then print(command_info("ping_usage"))
        result = s.ping(p[0])
        if result then
            if typeof(result) == "string" then
                print(result) 
            else
                print("Ping successful")
            end if
        else
            print("ip unreachable");
        end if
    end function
    cmds.apt_get=function(p)
        s=A.sessions.current
        c=s.host_computer
        aptclient = include_lib("/lib/aptclient.so")
        if not aptclient then
            aptclient = include_lib(cmds.dir + "/aptclient.so")
        end if
        if not aptclient then print("Error: Missing aptclient.so library in the /lib path or the current folder")
        PendingUpdating = function(folderPath)
            pendingUpdate = []
            targetFolder = c.File(folderPath)
            if targetFolder != null then
                files = targetFolder.get_files
                for itemFile in files
                    output = aptclient.check_upgrade(itemFile.path)
                    if output == true then
                        pendingUpdate.push(itemFile.name)
                    end if
                end for
            end if
            return pendingUpdate
        end function 
        if p.len == 0 or p.len > 3 then print(command_info("apt-get_usage"))
        action = p[0]
        if action == "update" then
            print("Updating package lists...")
            output = aptclient.update
            if output then print(output)
        else if action == "install" then
            print("Reading package lists...")
            if p.len != 2 then print(command_info("apt-get_usage"))
            print("Downloading " + p[1])
            output = aptclient.install(p[1])
            if output == true then print(p[1] + " installed")
            print(output)
        else if action == "search" then
            if p.len != 2 then print(command_info("apt-get_usage"))
            print(aptclient.search(p[1]))
        else if action == "show" then
            if p.len != 2 then print(command_info("apt-get_usage"))
            print(aptclient.show(p[1]))
        else if action == "addrepo" then
            if p.len < 2 or p.len > 3 then print(command_info("apt-get_usage"))
            port = 1542
            if p.len == 3 then port = p[2]
            output = aptclient.add_repo(p[1])
            if output then print(output)
            print("Repository " + p[1] + " added succesfully.\nLaunch apt with the update option to apply the changes")
        else if action == "delrepo" then
            if p.len != 2 then print(command_info("apt-get_usage"))
            output = aptclient.del_repo(p[1])
            if output then print(output)
            print("Repository " + p[1] + " removed succesfully.\nLaunch apt with the update option to apply the changes")
        else if action == "upgrade" then
            print("Reading package lists...")
            if p.len == 1 then
                pendingPackages = PendingUpdating("/lib") + PendingUpdating("/bin")
                if pendingPackages.len == 0 then print("No updates needed")
                print("The following packages will be updated:")
                pkgs = ""
                for itemPackage in pendingPackages
                    pkgs = pkgs + " " + itemPackage
                end for
                print(pkgs)
                option = user_input("\nDo you want to continue?(y/n): ")
                if option == "y" or option == "yes" then
                    counter = 0
                    for itemPackage in pendingPackages
                        output = aptclient.install(itemPackage)
                        if output == true then
                            counter = counter + 1
                        else if output then
                            print(output)
                        end if
                    end for
                    print(counter + " packages updated")
                else 
                    print("aborted")
                end if
            else if p.len == 2 then
                output = aptclient.check_upgrade(p[1])
                if not output then print("No updates needed")
                if output == true then
                    print("The following package will be updated:\np[1]")
                    option = user_input("\nDo you want to continue?(y/n): ")
                    if option == "y" or option == "yes" then
                        output = aptclient.install(p[1])
                        if output == true then print(p[1] + " installed.")
                        print(output)				
                    else 
                        print("aborted")
                    end if
                else 
                    print(output)
                end if
            end if
        else 
            print(command_info("apt-get_usage"))
        end if
    end function
    cmds.whoami=function(p)
        s=A.sessions.current
        c=s.host_computer
        usr="guest"
        if c.File("/root").has_permission("w") then 
            usr="root"
        else
            for user in c.File("/home").get_folders
                if user.has_permission("w") and user.name!="guest" then usr=user.name
            end for
        end if
        print usr
    end function
    cmds.exit=function(p)
        exit
    end function
    cmds.clear=function(p)
        clear_screen
    end function
    cmds.ls=function(p)
        s=A.sessions.current
        c=s.host_computer
        ValidateInput = function(input)
            if input == "-la" or input == "-l" or input == "-a" then return true
            return false
        end function 
        if p.len > 3 or (p.len == 1 and p[0].indexOf("-") != null and not ValidateInput(p[0])) or (p.len == 2 and not ValidateInput(p[0])) or (p.len == 3 and (not ValidateInput(p[0]) or not ValidateInput(p[1]))) then
            print(command_info("ls_usage"))
        else
            computer = c
            folderPath = cmds.dir
            if p and p[p.len - 1].indexOf("-") == null then
                folderPath = p[p.len - 1]
            end if
            folder = computer.File(folderPath)
            if folder == null then
                print("ls: No such file or directory")
            else
                if not folder.has_permission("r") then
                    print("ls: permission denied")
                else
                    showHide = 0
                    if p and p[0].indexOf("a") != null then
                        showHide = 1
                    end if
                    showDetails = 0
                    if p and p[0].indexOf("l") != null then
                        showDetails = 1
                    end if
                    subFiles = folder.get_folders + folder.get_files
                    output = ""
                    for subFile in subFiles
                        nameFile = subFile.name
                        permission = subFile.permissions
                        owner = subFile.owner
                        size = subFile.size
                        group = subFile.group
                        if showHide or nameFile.indexOf(".") != 0 then
                            if output.len > 0 then 
                                output = output + "\n"
                            end if
                            if showDetails then
                                output = output + permission + " " + owner + " " + group + " " + size + " 00:00 " + nameFile
                            else
                                output = output + nameFile
                            end if
                        end if
                    end for
                    print(format_columns(output))
                end if
            end if
        end if
    end function
    cmds.cd=function(p)
        s=A.sessions.current
        c=s.host_computer
        if p.len==0 then
            if cmds.usr=="root" then
                cmds.dir="/root"
                return
            else if cmds.usr=="guest" then
                cmds.dir="/home/guest"
                return
            else
                cmds.dir="/home/"+cmds.usr
                return
            end if
        else
            if p[0]==".." then 
                cmds.dir=c.File(cmds.dir).parent.path
            else
                new_folder=p[0]
                if new_folder.split("/").len==1 then
                    for folder in c.File(cmds.dir).get_folders
                        if folder.name==new_folder then cmds.dir=folder.path
                    end for
                else
                    cmds.dir=new_folder
                end if
            end if
        end if
    end function
    cmds.decipher=function(p)
        A.programs.rainbow.run("hash",0,0,p[0],1)
    end function
    cmds.sudo=function(p)
        s=A.sessions.current
        c=s.host_computer
        if not p or p[0] == "-h" or p[0] == "--help" or (p.len==1 and p[0]!="-s") then;print(command_info("sudo_usage"));A.terminal;end if
        if p[0] == "-u" and p.len != 2 then print(command_info("sudo_usage"))
        if p[0]=="-u" then
            if c.File(cmds.dir).has_permission("w") then
                c.touch(cmds.dir,"load.src")
                file=c.File(cmds.dir+"/load.src").set_content("user=get_custom_object[""sudo_user""]"+char(10)+"password=get_custom_object[""sudo_password""]"+char(10)+"shell=get_shell(user,password)"+char(10)+"if typeof(shell)==""shell"" then"+char(10)+"get_custom_object[""sudo_shell""]=shell"+char(10)+"else"+char(10)+"get_custom_object[""sudo_shell""]=null"+char(10)+"end if")
                buildResult = s.build(cmds.dir+"/load.src",cmds.dir)
                get_custom_object["sudo_user"]=p[1]
                get_custom_object["sudo_password"]=user_input("Password: ",true)
                s.launch(cmds.dir+"/load")
                if get_custom_object["sudo_shell"]!=null then 
                    A.sessions.current=get_custom_object["sudo_shell"]
                    A.terminal
                else
                    print "sudo: incorrect username or password"
                end if
            end if
        else
            if c.File(cmds.dir).has_permission("w") then
                c.touch(cmds.dir,"load.src")
                file=c.File(cmds.dir+"/load.src").set_content("user=get_custom_object[""sudo_user""]"+char(10)+"password=get_custom_object[""sudo_password""]"+char(10)+"shell=get_shell(user,password)"+char(10)+"if typeof(shell)==""shell"" then"+char(10)+"get_custom_object[""sudo_shell""]=shell"+char(10)+"else"+char(10)+"get_custom_object[""sudo_shell""]=null"+char(10)+"end if")
                buildResult = s.build(cmds.dir+"/load.src",cmds.dir)
                get_custom_object["sudo_user"]="root"
                get_custom_object["sudo_password"]=user_input("Password: ",true)
                s.launch(cmds.dir+"/load")
                if get_custom_object["sudo_shell"]!=null then 
                    A.sessions.current=get_custom_object["sudo_shell"]
                    A.terminal
                else
                    print "sudo: incorrect password"
                end if
            end if
        end if
    end function
    cmds.sniffer=function(p)
        x="go"
        print color.white+"Listening for Incoming Connections... On> "+A.sessions.current.host_computer.local_ip
        A.local_shit
        print color.white+"Listening for Incoming Connections... On> "+A.sessions.current.host_computer.local_ip
        while x!="exit" 
            if A.sessions.local_object["local_meta"].sniffer!=null then 
                print A.sessions.local_object["local_meta"].sniffer
                x=user_input("Exit?").lower
                if x!="exit" then
                    clear_screen
                    print color.white+"Listening for Incoming Connections..."
                end if
            end if
        end while
        A.terminal
    end function
    while true
            c=A.sessions.current.host_computer
            prompt=color.white+"["+color.yellow+c.public_ip+color.cap+"|"+color.yellow+c.local_ip+color.white+"] "+cmds.usr+"@"+A.sessions.current.host_computer.get_name+":"+cmds.dir+"> "
        input=user_input(prompt)
        input=input.split(" ")
        if input[0]=="encode" then
            m=user_input("local or server:")
            if m=="server" then file=A.computer.File(user_input("Full Path: "))
            if m=="local" then file=A.sessions.current.host_computer.File(user_input("Full Path: "))
            if typeof(file)=="file" then
                print "doing shit"
                A.scramble(file)
            end if
        end if
        if input[0]=="apt-get" then
            input.reverse
            input.pop
            input.push("apt_get")
            input.reverse
        end if
        if cmds.hasIndex(input[0]) then 
            cmds[input.pull](input)
        else if input[0]=="rshell" then
            A.programs.hack.run(A.rshell_ser)
        else if input[0]=="debug" then
            if A.debug==0 then
                print color.white+"Turning on Debug Mode!"
                A.debugf.set_content(1)
                A.debug=1
                continue
            else
                print color.white+"Debug Mode Turned Off!"
                A.debugf.set_content(0)
                A.debug=0
                continue
            end if
        else if input[0]=="dock" then
                sys=user_input("Dock With> ",1)
                if sys=="ware" then
                    if A.mode!="sp" then 
                        if user_input("*******************",1).lower=="24601" then A.remote_server.start_terminal
                    else
                        A.remote_server.start_terminal
                    end if
                else if sys=="hard" then
                    if A.mode!="sp" then 
                        if user_input("*******************",1).lower=="24601" then A.hardware_server.start_terminal
                    else
                        A.hardware_server.start_terminal
                    end if
                end if
        else if input[0]=="ou" then
            o=user_input("push/pull").lower
            if o=="push" then
                r=get_shell.scp(program_path,"/root",A.hardware_server)
                if typeof(r)=="string" then
                    exit(color.red+"ERR: "+r)
                else
                    A.hardware_server.launch("/root/"+program_path.split("/").pop,"info")
                exit "Print Version "+A.version+" Uploaded to Server!"
                end if
            else
                if get_shell.host_computer.File(current_path+"/.version").get_content!=A.hardware_server.host_computer.File("/root/.version").get_content then
                    user_input(color.white+"You are Running Version:"+current_date+char(10)+color.yellow+"Server Version is:"+A.hardware_server.host_computer.File("/root/.version").get_content,0,1)
                    print "Downloading OS UPDATE!"
                    r=A.hardware_server.scp("/root/"+program_path.split("/").pop,current_path,get_shell)
                    if typeof(r)=="string" then
                        exit "UPDATE FAILED: "+r
                    else
                        get_shell.launch(program_path,"info")
                        exit
                    end if
                else
                    exit color.white+"You are on the latest version!"
                end if
            end if
        else if input[0]=="info" then
            A.info
        else if input[0]=="shells" then
            A.session_manager
        else if input[0]=="save" then
            A.session_manager("save")
        else if input.len>1 then
            if input[0]=="man" then
                if A.programs.hasIndex(input[1]) and A.programs[input[1]].usg!="XXX" then
                    print(color.white+input[1]+":"+color.yellow+A.programs[input[1]].desc+char(10)+color.white+"<b>Usage: "+A.call+" "+input[1]+" ["+A.programs[input[1]].usg+"]")
                else if A.programs.hasIndex(input[1]) then
                    print(color.white+input[1]+":"+color.yellow+A.programs[input[1]].desc+char(10)+color.white+"<b>Usage: "+A.call+" "+input[1])
                else
                    print color.white+"manual entry for "+input[1]+" not found"
                end if
            else if input[0]=="ip" then
                if input[1]=="hack" then 
                    A.programs.hack.run(A.programs[input[0]].run)
                else
                    A.programs.nmap.run(A.programs[input[0]].run("*",input[2]))
                end if
            else if input.len==2 then
                if A.programs.hasIndex(input[0]) then A.programs[input[0]].run(input[1])
            else if input.len==3 then
                if A.programs.hasIndex(input[0]) then A.programs[input[0]].run(input[1],input[2])
            else if input.len==4 then
                if A.programs.hasIndex(input[0]) then A.programs[input[0]].run(input[1],input[2],input[3])
            else if input.len==5  then
                if A.programs.hasIndex(input[0]) then A.programs[input[0]].run(input[1],input[2],input[3],input[4])
            end if
        else if A.programs.hasIndex(input[0]) then 
            A.programs[input[0]].run
        else if input[0]=="reboot" then
            get_shell.launch(program_path)
        else if input[0]=="" then 
            for i in A.programs
                if i.value.usg=="XXX" then 
                    print color.white+i.value.name+":"+i.value.desc
                else
                    print color.white+i.value.name+":"+i.value.desc+":"+color.yellow+i.value.usg
                end if
            end for
        else
            print input[0]+": command not found"
        end if
    end while
end function
A.setup
A.local_shit
clear_screen
A.terminal