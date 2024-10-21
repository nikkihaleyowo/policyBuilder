import React from 'react'
import {Page, Text, Image, Document, StyleSheet, View, usePDF} from '@react-pdf/renderer'

import WebbSecuredImg from "../images/WebbSecured.png"
//import { text } from 'framer-motion/client';

import { convertToRoman } from '../utils/utils';
import { usePDFContext } from '../Context/PDFContext';

import { formatLocation } from '../utils/utils'

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row', // Set the layout to row
      justifyContent: 'space-between', // Adjust spacing between elements (adjust as needed)
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
    },
    front: {
        fontSize: 24,
        textAlign:"center",
        top:120
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        
    },
    li: {
        margin: 12,
        fontSize: 14,
        left:20,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        
    },
    image: {
        marginVertical: 20,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        position: "absolute",
        fontSize: 12,
        bottom: 10,
        left: 30,
        right: 0,
        color: "grey",
        borderTop: '1px solid black', // Adjust border width, color, and style as needed
        width: '100%',
    },
});
const PDFFile = (props) => {


  const renderSubData = (data) => {
    return data.map((d, ii) => (
        <>
        {d.data = d.data.filter(item => item!=="")}
        {d.type==="p" && (<View key={ii}><Text style={styles.text}>{[...d.data].join('\n')}</Text></View>)}
        {d.type==="ul" && (<View key={ii}><Text style={styles.text}>•    {[...d.data].join('\n\n•    ')}</Text></View>)}
        
        </>
    ));
  };

  

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.front}>
          <Text>{props.userState.companyData.name==='' ? '(Name Of Organization)' : props.userState.companyData.name}</Text>
          <Text>{props.userState.companyData.name==='' ? '(Location of Organization)' : formatLocation(props.userState.companyData)}</Text>
          <Text>   </Text>
          <Text>{props.state.title}</Text>
          <Text>(67 FR 36484)</Text>
          <Text>   </Text>
          <Text>Rev: 1.0</Text>
          <Text>Board Approval Date:</Text>
        </View>
      </Page>
      <Page style={styles.body}>
        <Text style={styles.header} fixed></Text>
        <Image style={styles.image} src={WebbSecuredImg} />
        {props.state.data.map((sub, index) => (
          <View key={index}>
            <View>
              <Text style={styles.title}>{convertToRoman(index + 1)}.{sub.subTitle}</Text>
            </View>
            {renderSubData(sub.data)}
          </View>
        ))}
        {/*<Text style={styles.pageNumber} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />*/}
        <View style={styles.footer} fixed>
          <Text>{props.userState.companyData.name==='' ? '(Name Of Organization)' : props.userState.companyData.name}</Text>
          <Text >{props.state.title}  Revision 1.0</Text>
          <Text >Approved: Date</Text>
        </View>
        
      </Page>
    </Document>
  );
}

export default PDFFile