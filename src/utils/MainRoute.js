
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerView } from '../components/dashboard/DrawerView';
import { HeaderComponent } from '../components/CustomComponents/HeaderComponent';
import { AddFollowers } from '../components/AddFollowers';
import { ProductDetails } from '../components/ProductDetails';
import { Account } from '../components/dashboard/Account';
import { EditProfile } from '../components/EditProfile';
import { MyOrders } from '../components/ProfileComponents/MyOrders';
import { MyWishlist } from '../components/ProfileComponents/MyWishlist';
import { MyWallet } from '../components/ProfileComponents/MyWallet';
import { Help } from '../components/ProfileComponents/Help';
import { ChangePassword } from '../components/ProfileComponents/ChangePassword';
import { SearchBar } from '../components/SearchPage';
import { ShoppingCart } from '../components/ShoppingCart';
import { SearchFollowers } from '../components/SearchFollowers';
import { ShippingAddress } from '../components/ShippingAddress';
import { CheckOut } from '../components/CheckOut';
import { OrderDetails } from '../components/OrderDetails';
import RadioButtons from '../components/CustomComponents/RadioButton';
import { ReturnProduct } from '../components/ReturnProduct';
import { ReturnProduct2 } from '../components/ReturnProduct2';
import { ReturnProduct3 } from '../components/ReturnProduct3';
import { ManagePayments } from '../components/ManagePayments';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFailure } from '../components/PaymentFailure';
import { Splash } from '../components/Splash';
import { Cosmetics } from '../components/dashboard/Categories/Cosmetics';
import { MyProfile } from '../components/ProfileComponents/MyProfile';
import { MyRegularBasket } from '../components/ProfileComponents/MyRegularBasket';
import { MySharedCart } from '../components/ProfileComponents/MySharedCart';
import { AddressBook } from '../components/ProfileComponents/AddressBook';
import { useSelector } from 'react-redux';
import { Login } from '../components/Login';
import ProductList from '../components/dashboard/Categories/ProductList';
import SubCategories from '../components/dashboard/Categories/SubCategories';
import AddAddress from '../components/ProfileComponents/AddAddress';

const RootStack = createStackNavigator();
const screens = [
 
  {
    name: 'DrawerView',
    components: DrawerView,
    headerBackTitle: 'Home',
    headerShown: false,
  },
  {
    name: 'HeaderComponent',
    components: HeaderComponent,
    headerBackTitle: 'HeaderComponent',
  },
 
  {
    name: 'AddFollowers',
    components: AddFollowers,
    headerBackTitle: 'Home',
  },

  {
    name: 'ProductDetails',
    components: ProductDetails,
    headerBackTitle: 'ProductDetails',
  },
  {
    name: 'Account',
    components: Account,
  },
  {
    name: 'EditProfile',
    components: EditProfile,
    headerBackTitle: 'EditProfile',
  },
  {
    name: 'MyOrders',
    components: MyOrders,
    headerBackTitle: 'MyOrders',
  },
  {
    name: 'MyWishlist',
    components: MyWishlist,
    headerBackTitle: 'MyWishlist',
  },
  {
    name: 'MyWallet',
    components: MyWallet,
    headerBackTitle: 'MyWallet',
  },
  {
    name: 'Help',
    components: Help,
    headerBackTitle: 'Help',
  },
  {
    name: 'ChangePassword',
    components: ChangePassword,
    headerBackTitle: 'ChangePassword',
  },
  {
    name: 'SearchBar',
    components: SearchBar,
    headerBackTitle: 'SearchBar',
  },
  {
    name: 'ShoppingCart',
    components: ShoppingCart,
    headerBackTitle: 'ShoppingCart',
  },
  {
    name: 'SearchFollowers',
    components: SearchFollowers,
    headerBackTitle: 'SearchFollowers',
  },
  {
    name: 'ShippingAddress',
    components: ShippingAddress,
    headerBackTitle: 'ShippingAddress',
  },
  {
    name: 'CheckOut',
    components: CheckOut,
    headerBackTitle: 'CheckOut',
  },
  {
    name: 'OrderDetails',
    components: OrderDetails,
    headerBackTitle: 'OrderDetails',
  },
  {
    name: 'RadioButtons',
    components: RadioButtons,
    headerBackTitle: 'RadioButtons',
  },
  {
    name: 'ReturnProduct',
    components: ReturnProduct,
    headerBackTitle: 'ReturnProduct',
  },
  {
    name: 'ReturnProduct2',
    components: ReturnProduct2,
    headerBackTitle: 'ReturnProduct2',
  },
  {
    name: 'ReturnProduct3',
    components: ReturnProduct3,
    headerBackTitle: 'ReturnProduct3',
  },
  {
    name: 'ManagePayments',
    components: ManagePayments,
    headerBackTitle: 'ManagePayments',
  },
  {
    name: 'PaymentSuccess',
    components: PaymentSuccess,
    headerBackTitle: 'PaymentSuccess',
  },
  {
    name: 'PaymentFailure',
    components: PaymentFailure,
    headerBackTitle: 'PaymentFailure',
  },
  {
    name: 'Splash',
    components: Splash,
    headerBackTitle: 'Splash',
  },
  {
    name: 'Cosmetics',
    components: Cosmetics,
    headerBackTitle: 'Cosmetics',
  },
  {
    name: 'MyProfile',
    components: MyProfile,
    headerBackTitle: 'MyProfile',
  },
  {
    name: 'MyRegularBasket',
    components: MyRegularBasket,
    headerBackTitle: 'MyRegularBasket',
  },
  {
    name: 'MySharedCart',
    components: MySharedCart,
    headerBackTitle: 'MySharedCart',
  },
  {
    name: 'AddressBook',
    components: AddressBook,
    headerBackTitle: 'AddressBook',
  },
  {
    name: 'ProductList',
    components: ProductList,
    headerBackTitle: 'ProductList',
  },
  {
    name: 'SubCategories',
    components: SubCategories,
    headerBackTitle: 'SubCategories',
  },
  {
    name: 'AddAddress',
    components: AddAddress,
    headerBackTitle: 'AddAddress',
  },
];
const MainRoute = () => {
     const login_status = useSelector((state) => state.User.login_status)
    console.log("login status",login_status)
  return (
    <RootStack.Navigator>

     {login_status ? ( 
     <>
          {screens.map((item, index) => (
                <RootStack.Screen
                  key={index}
                  name={item.name}
                  component={item.components}
                  options={{
                    headerBackTitle: item.headerBackTitle ?? item.name,
                    title: item.headerBackTitle,
                    headerTintColor: '#FFFFFF',
                    headerStyle: {backgroundColor: '#ED7421'},
                    headerShown: false,
                  }}
                />
              ))}
        </>
         ):(
            <RootStack.Screen  name="Login"
                component={Login}
                options={{headerShown: false}}/>
              )}
    </RootStack.Navigator>
  )
}

export default MainRoute