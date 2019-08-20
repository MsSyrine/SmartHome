
{  
"mac_address": "DD56F89a3C",
"serial_id": "10001000101", 
"state": "on",
"version": "1.0",
"id_product": "123458",
"type_device": "electrical"
}
{  
"mac_address": "CC56F89a3D",
"serial_id": "10011110101",
"state": "off",
"version": "1.0",
"id_product": "123457",
"type_device": "electrical"
}

{
    "mac_address": "ADFFS5_6E89a3C",
    "serial_id": "1011101010",
    "state": "off",
    "version": "1.0",
    "id_product": "123459",
    "type_device": "electrical"
},
{
    "mac_address": "ADC2S5_6E89a3C",
    "serial_id": "1001101010",
    "state": "off",
    "version": "1.0",
    "id_product": "123457",
    "type_device": "electrical"
}

//perform a post request to the following url
http://localhost:3000/api/homes/:home_id/devices
//note the home must be created before adding the device!
//note the home_id is to be taken from db before performing a request