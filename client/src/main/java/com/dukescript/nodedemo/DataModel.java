package com.dukescript.nodedemo;

import net.java.html.json.Function;
import net.java.html.json.Model;
import net.java.html.json.Property;
import net.java.html.json.ModelOperation;
import com.dukescript.nodedemo.js.PlatformServices;
import net.java.html.json.OnReceive;

@Model(className = "Data", targetId = "", instance = true, properties = {
    @Property(name = "message", type = String.class)
})
final class DataModel {

    private PlatformServices services;

    @ModelOperation
    void initServices(Data model, PlatformServices services) {
        this.services = services;
    }
    private static Data ui;

    /**
     * Called when the page is ready.
     */
    static void onPageLoad(PlatformServices services) throws Exception {
        ui = new Data("Hallo");
        ui.initServices(services);
        ui.applyBindings();
        ui.receive(null);//connect
    }

    @Function 
    public static void send(Data data){
        data.receive(data);
    }
    
    @OnReceive(url = "ws://localhost:8085", data = Data.class,method = "WebSocket")
    public static void receive(Data data, Data message) {
        if (message != null) {
            ui.setMessage(message.getMessage());
        }
        else System.out.println("conection established");
    }

}
