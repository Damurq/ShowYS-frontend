import { FontAwesome5 } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { container, text, utils } from '../../styles';
import { timeDifference } from '../../utils';


function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [input, setInput] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [textInput, setTextInput] = useState(null)


    return (
        <View style={[container.container, container.alignItemsCenter, utils.backgroundWhite]}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={utils.padding10}>
                        {item.user !== undefined ?
                            <View style={container.horizontal}>
                                {item.user.image == 'default' ?
                                    (
                                        <FontAwesome5
                                            style={[utils.profileImageSmall]}
                                            name="user-circle" size={35} color="black"
                                        // onPress={() => props.navigation.navigate("Profile", { uid: item.user.uid, username: undefined })} 
                                        />


                                    )
                                    :
                                    (
                                        <Image
                                            style={[utils.profileImageSmall]}
                                            source={{
                                                uri: item.user.image
                                            }}
                                        // onPress={() => props.navigation.navigate("Profile", { uid: item.user.uid, username: undefined })} 
                                        />

                                    )
                                }
                                <View style={{ marginRight: 30 }}>
                                    <Text style={[utils.margin15Right, utils.margin5Bottom, { flexWrap: 'wrap' }]}>

                                        <Text style={[text.bold]}
                                            onPress={() => {
                                                // props.navigation.navigate("Profile", { uid: item.user.uid, username: undefined })
                                            }
                                            }>
                                            {item.user.name}
                                        </Text>
                                        {" "}  {item.text}
                                    </Text>
                                    <Text
                                        style={[text.grey, text.small, utils.margin5Bottom]}>
                                        {timeDifference(new Date(), item.creation.toDate())}
                                    </Text>
                                </View>


                            </View>
                            : null}


                    </View>
                )
                }
            />
            <View style={[utils.borderTopGray]}>
                < View style={[container.horizontal, utils.padding10, utils.alignItemsCenter, utils.backgroundWhite]} >
                    {/* {
                        props.currentUser.image == 'default' ?
                            (
                                <FontAwesome5
                                    style={[utils.profileImageSmall]}
                                    name="user-circle" size={35} color="black" />

                            )
                            :
                            (
                                <Image
                                    style={[utils.profileImageSmall]}
                                    source={{
                                        uri: props.currentUser.image
                                    }}
                                />
                            )
                    } */}
                    <View style={[container.horizontal, utils.justifyCenter, utils.alignItemsCenter]}>
                        < TextInput
                            ref={input => { setTextInput(input) }}
                            value={input}
                            multiline={true}
                            style={[container.fillHorizontal, container.input, container.container]}
                            placeholder='comment...'
                            onChangeText={(input) => setInput(input)} />

                        < TouchableOpacity
                            onPress={() => onCommentSend()}
                            style={{ width: 100, alignSelf: 'center' }}>
                            <Text style={[text.bold, text.medium, text.deepskyblue]} >Post</Text>
                        </TouchableOpacity >
                    </View>

                </View >
            </View>

        </View >
    )
}

export default Comment;
