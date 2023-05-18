import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

const ListScreen = () => {
  const [unitPrice, setUnitPrice] = useState<string>('');
  const [name, setName] = useState<string>('');

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery(
    'supplierData',
    () => {
      return axios.get('https://646691a3ba7110b663a3f9f9.mockapi.io/products');
    },
    {
      refetchInterval: 10000,
    },
  );

  const {isLoading: postLoading, mutate} = useMutation({
    mutationFn: async (data: any) => {
      let result = await axios.post(
        'https://646691a3ba7110b663a3f9f9.mockapi.io/products',
        data,
      );
      return result;
    },
    onSuccess: () => {
      refetch();
    },
    onError: err => {
      console.log('Error!', err);
    },
  });

  const add = () => {
    mutate({name: name, unitPrice: unitPrice});
  };

  const renderItem = ({item}: any) => {
    return (
      <>
        <Text style={{color: 'black'}}>{item.name}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={{color: 'black', fontSize: 22}}>Name</Text>
        <View style={styles.inputItem}>
          <TextInput
            onChangeText={setName}
            placeholder="Enter Name"
            style={{fontSize: 15, color: 'black'}}
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={{color: 'black', fontSize: 22}}>Unit Price</Text>
        <View style={styles.inputItem}>
          <TextInput
            onChangeText={setUnitPrice}
            placeholder="Enter Unit Price"
            style={{fontSize: 15, color: 'black'}}
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={add}>
        <Text style={{color: 'white', alignSelf: 'center'}}>ADD</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={refetch}>
        <Text style={{color: 'white', alignSelf: 'center'}}>REFRESH</Text>
      </TouchableOpacity>
      <View style={{marginTop: 25, marginHorizontal: 15, flex:1}}>
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  inputItem: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    marginHorizontal: 80,
    marginTop: 25,
    borderRadius: 8,
  },
});
