import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


import {Table, Row} from 'react-native-table-component';

import Icon from 'react-native-vector-icons/Ionicons';

export const TableRowItem = ({
  rowIndex,
  colIndex,
  label,
  onPress,
  type = 'text',
  icon,
  iconColor = blue,
  icons = [],
  colors = [],
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
        type == 'icons' && {flexDirection: 'row'},
      ]}
      onPress={type == 'icons' ? null : () => onPress(rowIndex, colIndex)}>
      {type == 'text' && (
        <Text
          preset={'PARAGRAPH_2R_14'}
          color={'blue'}
          tx={label}
          style={{textAlign: 'center'}}></Text>
      )}
      {type == 'icon' && (
        <Icon name={icon} size={25} color={iconColor} />
      )}
      {type == 'icons' &&
        icons.map((icon, i) => (
          <Icon
            key={`${i + 1}`}
            name={icon}
            size={25}
            color={colors[i]}
            onPress={() => {
              onPress(rowIndex, colIndex, i);
            }}
            style={{
              paddingHorizontal: 5,
            }}
          />
        ))}
    </TouchableOpacity>
  );
};

export const AppTable = props => {
  let {containerStyle, tableHeaders, widthArr, tableData, title} = props;

  return (
    <>
      <View
        style={[
          {
            padding: 20,
            paddingVertical: 15
          },
          {...containerStyle},
        ]}>
        {title && (
          <View
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical:8,
            }}>
            <Text preset={'PARAGRAPH_1M_16'} color={'white'} tx={title} />
          </View>
        )}
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <Row
                data={tableHeaders}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table
                style={{}}
                borderStyle={{
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: 'white'},
                    ]}
                    textStyle={styles.textRow}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 8,
    paddingTop: 10,
    backgroundColor:'white',
  },
  header: {height: 50, backgroundColor: 'grey'},
  text: {
    textAlign: 'center',
    color: 'white',
    
  },
  textRow: {
    textAlign: 'center',
    marginTop:5,
    color: 'black',

  },
  dataWrapper: {marginTop: -1},
  row: {backgroundColor: 'white', paddingBottom: 10},
  btn: {width: 30, height: 30, borderRadius: 2},
  btnText: {textAlign: 'center', color: 'white'},
});
