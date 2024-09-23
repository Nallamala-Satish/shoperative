import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import {Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseURL } from '../../utils/Constants';
import { AppTable } from '../CustomComponents/AppTable';

const MyWallet = () => {
  const data =[
    {
      "cart_id": "9",
      "orderid": "1",
      "ordernumber": "SHPRTV16132002546",
      "orderdate": "2021-02-13 12:40:54",
      "shippingCharges": "20",
      "unitPrice": "20",
      "totalAmount": "20",
      "refundAmount": "40",
      "productName": "ANTISEPTIC SOAP",
      "cancelledOn": "2024-04-17 12:37:29",
      "reason": "you cancelled order item."
    },
    {
      "cart_id": "8",
      "orderid": "1",
      "ordernumber": "SHPRTV16132002546",
      "orderdate": "2021-02-13 12:40:54",
      "shippingCharges": "20",
      "unitPrice": "210",
      "totalAmount": "210",
      "refundAmount": "230",
      "productName": "ALMOND OIL VEG CAPSULE",
      "cancelledOn": "2024-04-17 12:37:29",
      "reason": "you cancelled order item."
    },
    {
      "cart_id": "7",
      "orderid": "1",
      "ordernumber": "SHPRTV16132002546",
      "orderdate": "2021-02-13 12:40:54",
      "shippingCharges": "20",
      "unitPrice": "42",
      "totalAmount": "42",
      "refundAmount": "62",
      "productName": "ALMOND & HONEY SOAP",
      "cancelledOn": "2024-04-17 12:37:29",
      "reason": "you cancelled order item."
    }
  ]

  const data1 =332

  const [walletRes,setWalletRes] = useState([])
  const[walletAmount,setWalletAmount] = useState('')

  const getMyWallet = async ()=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
     console.log(raw)
    await fetch(`${baseURL}/myWallet`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        console.log('wallet res.', res);
        if (res.message == 'success') {
          setWalletRes(res.data)
          setWalletAmount(res.total_wallet_amt)
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  useEffect(()=>{
    getMyWallet()
  },[])

  const tableHeaders = [
    'S.No',
    'Item Name',
    'Order',
    'Order Date',
    'Cancelled On',
    'Unit Price',
    'Shipping Charges',
    'Total Amount',
    'Refund Amount',
    'Reason'
  ];
  const widthArr = [
   75,200,200,150,150,100,100,100,100,200
  ];

  let tableData = [];
  for (let index = 0; index < data.length; index++) {
    const wallet = data[index];
    const rowData = [];
    for (let j = 0; j <= 11; j += 1) {
      if (j == 0) {
        rowData.push(`${index+1}`)
      }
      if (j == 1) {
           rowData.push(`${wallet.productName ? wallet.productName :''}`)
      }
      if (j == 2) {
        rowData.push(`${wallet.ordernumber ? wallet.ordernumber :''}`)
      }
      if (j == 3) {
         rowData.push(`${wallet.orderdate ? wallet.orderdate :''}`)
      }
      if (j == 4) {
        rowData.push(`${wallet.cancelledOn ? wallet.cancelledOn :''}`)
      }
      if (j == 5) {
        rowData.push(`${wallet.unitPrice ? wallet.unitPrice :''}`
        )
      }
      if (j == 6) {
        rowData.push(`${wallet.shippingCharges ? wallet.shippingCharges :''}`
        )
      }
      if (j == 7) {
        rowData.push(`${wallet.totalAmount ? wallet.totalAmount :''}`
        )
      }
      if (j == 8) {
        rowData.push(`${wallet.refundAmount ? wallet.refundAmount :''}`
        )
      }
      if (j == 9) {
        rowData.push(`${wallet.reason ? wallet.reason :''}`
        )
      }
     
    }
    tableData.push(rowData);
  }


  return (
    <View style={styles.container}>
      <HeaderComponent title={'My Wallet'} />

      <View
        style={{
          width: '90%',
          marginTop: 20,
          backgroundColor: '#FFF',
          justifyContent: 'space-between',
          height: '80%',
        }}>
        <Text style={styles.headingTextStyles}>YOUR CASH BALANCE</Text>
        <Text style={styles.balanceTextStyles}>₹ {data1}</Text>

        {/* <View>
          <Text style={styles.referalStyles1}>Share Referral Code</Text>
          <Text style={styles.referalStyles2}>
            Earn ₹100 For Each Friend You Refer
          </Text>
        </View>

        <Text style={styles.coupanCodeStyles}>DGSOHJNSJCJS</Text>

        <View style={styles.buttonsContainerStyles}>
          <Pressable style={styles.button1Styles}>
            <FontAwesome name="whatsapp" size={20} color={'#FFF'} />
            <Text style={[styles.buttontextStyles, {color: '#FFF'}]}>
              WhatsApp
            </Text>
          </Pressable>
          <Pressable style={styles.button2Styles}>
            <FontAwesome name="share-alt" size={20} color={'#ED7421'} />
            <Text style={[styles.buttontextStyles, {color: '#ED7421'}]}>
              More Options
            </Text>
          </Pressable>
        </View>

        <Text style={styles.rulesHeadingStyle}>How it works</Text>
        <View style={styles.rulesContentView}>
          <FontAwesome
            name="share-alt"
            size={15}
            color={'#ED7421'}
            style={styles.rulesIconStyles}
          />
          <Text style={styles.rulesTextStyles}>
            Share the referral link with your friends
          </Text>
        </View>
        <View style={styles.rulesContentView}>
          <MaterialCommunityIcons
            name="cursor-pointer"
            size={15}
            color={'#ED7421'}
            style={styles.rulesIconStyles}
          />
          <Text style={styles.rulesTextStyles}>
            Your friend clicks on the link or signs up{'\n'} through the code
          </Text>
        </View>
        <View style={styles.rulesContentView}>
          <MaterialCommunityIcons
            name="cursor-pointer"
            size={15}
            color={'#ED7421'}
            style={styles.rulesIconStyles}
          />
          <Text style={styles.rulesTextStyles}>
            Your friend gets $100 Cash on sign up.{'\n'}You get 100 when they
            complete an order{'\n'}of 3100 or more within 7 days.
          </Text>
        </View> */}

       <ScrollView>
               <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5
                    }}
                  >
                    <AppTable
                      tableHeaders={tableHeaders}
                      widthArr={widthArr}
                      tableData={tableData }
                      containerStyle={{
                        padding:3,
                        paddingVertical:5,
                      }}
                    />
                  </View>

      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headingTextStyles: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3f3f3f',
  },
  balanceTextStyles: {
    fontSize: 44,
    fontWeight: '600',
    color: '#ED7421',
  },
  contentTextStyles: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: '#3f3f3f',
  },
  referalStyles1: {
    fontSize: 17,
    // fontFamily: 'Poppins-Bold',
    color: '#3f3f3f',
    fontWeight: '700',
  },
  referalStyles2: {
    fontSize: 14,
    // fontFamily: 'Poppins-Medium',
    color: '#3f3f3f',
    fontWeight: '500',
  },
  coupanCodeStyles: {
    width: '100%',
    height: 50,
    textAlignVertical: 'center',
    borderWidth: 1.5,
    borderColor: '#ED7421',
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 16,
    fontWeight: '500',
    color: '#3f3f3f',
  },
  buttonsContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
  },
  button1Styles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ED7421',
    borderRadius: 30,
    width: '40%',
    height: '55%',
    justifyContent: 'space-evenly',
  },
  button2Styles: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ED7421',
    borderRadius: 30,
    justifyContent: 'space-evenly',
    width: '40%',
    height: '55%',
  },
  buttontextStyles: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  rulesHeadingStyle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3f3f3f',
  },
  rulesContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  rulesTextStyles: {
    fontSize: 14,
    color: '#3f3f3f',
    fontWeight: '700',
  },
  rulesIconStyles: {
    paddingRight: 20,
  },
});

export {MyWallet};
