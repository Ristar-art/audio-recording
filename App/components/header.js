import  React from 'react';
import { StyleSheet,Text,View } from 'react-native'; 

export default function Header(){

     return(

        <View style={styles.header}>
            <Text style={styles.title}>Understanding Good vs Evil</Text>
        </View>
     )

}

const styles= StyleSheet.create({

header: {
    height :80,
    paddingTop:38,
   
},
title: {
    textAlign : 'center',
    
    fontSize:20,
    fontWeight:'bold',

}

})