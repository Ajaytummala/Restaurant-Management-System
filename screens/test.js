{"navigation": 
            {"addListener": [Function addListener], 
            "canGoBack": [Function canGoBack], 
            "dispatch": [Function dispatch], 
            "getParent": [Function getParent], 
            "getState": [Function anonymous], 
            "goBack": [Function anonymous], 
            "isFocused": [Function isFocused], 
            "jumpTo": [Function anonymous], 
            "navigate": [Function anonymous], 
            "pop": [Function anonymous], 
            "popToTop": [Function anonymous], 
            "push": [Function anonymous], 
            "removeListener": [Function removeListener], 
            "replace": [Function anonymous], 
            "reset": [Function anonymous], 
            "setOptions": [Function setOptions], 
            "setParams": [Function anonymous]}, 
            "route": {
                "key": "Payment-lg3tZzd66tnAZPHwvLuui", 
                "name": "Payment", 
                "params": {
                    "items": [Array]}, "path": undefined}}


{each.map((item) => { 
return (
    <View style={styles.cardContainer}>
        <LinearGradient colors={['#e0aaff', '#dee2ff']} style={{ borderRadius: 20 }}>
            <View style={styles.textCont}>
                <Image style={{ width: 70, height: 70, borderRadius: 10, borderColor: '#000', borderWidth: 1, marginRight: 25 }} source={{ uri: post.image }} />
                <View style={styles.tiletext}>
                    <Text >Name : {item.name.toString()}</Text>
                    <Text >Phone : {item.count}</Text>
                </View>
                {/* <FormButton style={styles.btn} buttonTitle={<Icon name="delete" color='#fff' size={23} />} onPress={() => onDelete(post.id)} /> */}
</View>
        </LinearGradient>
    </View>
);
})}
<Text>{order.count}</Text>
{/* { 
props.params.items.map((todo) => {
let i = 0;
return (
    <View key={i++}>
        <Text>{todo.name}</Text>
        <Text>{todo.price}</Text>
    </View>
);
})} */}