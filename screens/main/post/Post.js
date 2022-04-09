import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';//install
import { useIsFocused } from '@react-navigation/native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import BottomSheet from 'react-native-bottomsheet-reanimated';
import { Divider, Snackbar } from 'react-native-paper';
import ParsedText from 'react-native-parsed-text';

import { container, text, utils } from '../../styles';
import { timeDifference } from '../../utils';
import CachedImage from '../random/CachedImage';



const WINDOW_WIDTH = Dimensions.get("window").width;

function Post(props) {
    const [item, setItem] = useState(props.route.params.item.item)
    const [user, setUser] = useState(props.route.params.item.user)
    const [currentUserLike, setCurrentUserLike] = useState(false)
    const [unmutted, setUnmutted] = useState(true)
    const [videoref, setvideoref] = useState(null)
    const [sheetRef, setSheetRef] = useState(useRef(null))
    const [modalShow, setModalShow] = useState({ visible: false, item: null })
    const [isValid, setIsValid] = useState(true);
    const [exists, setExists] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const isFocused = useIsFocused();
    const onUsernamePress = (username, matchIndex) => {
        // props.navigation.navigate("ProfileOther", { username, uid: undefined })
    }

    const onLikePress = (userId, postId, item) => {
        item.likesCount += 1;
        setCurrentUserLike(true)
    }
    const onDislikePress = (userId, postId, item) => {
        item.likesCount -= 1;
        setCurrentUserLike(false)
    }
    if (!exists && loaded) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <FontAwesome5 style={{ alignSelf: 'center', marginBottom: 20 }} name="dizzy" size={40} color="black" />
                <Text style={[text.notAvailable]}>Post does not exist</Text>
            </View>
        )
    }
    if (!loaded) {
        return (<View></View>)

    }
    if (user == undefined) {
        return (<View></View>)
    }
    if (item == null) {
        return (<View />)
    }

    const _handleVideoRef = (component) => {
        setvideoref(component);

        if (component !== null) {
            component.setIsMutedAsync(props.route.params.unmutted)
        }
    }

    if (videoref !== null) {
        videoref.setIsMutedAsync(unmutted)
        if (isFocused && props.route.params.index == props.route.params.inViewPort) {
            videoref.playAsync()
        } else {
            videoref.stopAsync()

        }
    }


    if (sheetRef.current !== null && !props.route.params.feed) {
        if (modalShow.visible) {
            sheetRef.snapTo(0)
        } else {
            sheetRef.snapTo(1)
        }
    }

    return (
        <View style={[container.container, utils.backgroundWhite]}>

            <View>
                <View style={[container.horizontal, { alignItems: 'center', padding: 10 }]}>
                    <TouchableOpacity
                        style={[container.horizontal, { alignItems: 'center' }]}
                        onPress={() => {
                            //props.navigation.navigate("ProfileOther", { uid: user.uid, username: undefined })
                        }}>

                        {user.image == 'default' ?
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
                                        uri: user.image
                                    }}
                                />
                            )
                        }
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={[text.bold, text.medium, { marginBottom: 0 }]} >{user.name}</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[{ marginLeft: 'auto' }]}

                        onPress={() => {
                            if (props.route.params.feed) {
                                props.route.params.setModalShow({ visible: true, item })
                            } else {
                                setModalShow({ visible: true, item })
                            }
                        }}>
                        <Feather
                            name="more-vertical" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                {item.type == 0 ?
                    <View>
                        {props.route.params.index == props.route.params.inViewPort && isFocused ?
                            <View>
                                <VideoPlayer
                                    videoProps={{
                                        isLooping: true,
                                        shouldPlay: true,
                                        resizeMode: Video.RESIZE_MODE_COVER,
                                        source: {
                                            uri: item.downloadURL,
                                        },
                                        videoRef: _handleVideoRef,
                                    }}
                                    inFullscreen={false}
                                    showControlsOnLoad={true}
                                    showFullscreenButton={false}
                                    height={WINDOW_WIDTH}
                                    width={WINDOW_WIDTH}
                                    shouldPlay={true}
                                    isLooping={true}
                                    style={{
                                        aspectRatio: 1 / 1, height: WINDOW_WIDTH,
                                        width: WINDOW_WIDTH, backgroundColor: 'black'
                                    }}
                                />

                                <TouchableOpacity
                                    style={{ position: 'absolute', borderRadius: 500, backgroundColor: 'black', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', margin: 10, right: 0 }}
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (videoref == null) {
                                            return;
                                        }
                                        if (unmutted) {
                                            if (props.route.params.setUnmuttedMain == undefined) {
                                                setUnmutted(false)
                                            } else {
                                                props.route.params.setUnmuttedMain(false)

                                            }

                                        } else {
                                            if (props.route.params.setUnmuttedMain == undefined) {
                                                setUnmutted(true)
                                            } else {
                                                props.route.params.setUnmuttedMain(true)

                                            }

                                        }

                                    }}>
                                    {!unmutted ?

                                        <Feather name="volume-2" size={20} color="white" />
                                        :
                                        <Feather name="volume-x" size={20} color="white" />
                                    }
                                </TouchableOpacity>

                            </View>

                            :
                            <View style={{ marginTop: 4 }}>

                                <CachedImage
                                    cacheKey={item.id}
                                    style={[container.image]}
                                    source={{ uri: item.downloadURLStill }}
                                />
                            </View>
                        }

                    </View>

                    :

                    <CachedImage
                        cacheKey={item.id}
                        style={container.image}
                        source={{ uri: item.downloadURL }}
                    />
                }

                <View style={[utils.padding10, container.horizontal]}>
                    {currentUserLike ?
                        (
                            <Entypo name="heart" size={30} color="red" onPress={() => onDislikePress(user.uid, item.id, item)} />
                        )
                        :
                        (
                            <Feather name="heart" size={30} color="black" onPress={() => onLikePress(user.uid, item.id, item)} />

                        )
                    }
                    <Feather style={utils.margin15Left} name="message-square" size={30} color="black" onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: user.uid, user })} />
                </View>
                <View style={[container.container, utils.padding10Sides]}>
                    <Text style={[text.bold, text.medium]}>
                        {item.likesCount} likes
                    </Text>
                    <Text style={[utils.margin15Right, utils.margin5Bottom]}>
                        <Text style={[text.bold]}
                            onPress={() => {
                                // props.navigation.navigate("ProfileOther", { uid: user.uid, username: undefined })
                            }}>
                            {user.name}
                        </Text>

                        <Text>    </Text>
                        <ParsedText
                            parse={
                                [
                                    { pattern: /@(\w+)/, style: { color: 'green', fontWeight: 'bold' }, onPress: onUsernamePress },
                                ]
                            }
                        >{item.caption}</ParsedText>

                    </Text>
                    <Text
                        style={[text.grey, utils.margin5Bottom]} onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: user.uid, user })}>
                        View all {item.commentsCount} Comments
                    </Text>
                    <Text
                        style={[text.grey, text.small, utils.margin5Bottom]}>
                    </Text>
                </View>
            </View>

            <BottomSheet
                bottomSheerColor="#FFFFFF"
                ref={setSheetRef}
                initialPosition={0} //200, 300
                snapPoints={[300, 0]}
                isBackDrop={true}
                isBackDropDismissByPress={true}
                isRoundBorderWithTipHeader={true}
                backDropColor="black"
                isModal
                containerStyle={{ backgroundColor: "white" }}
                tipStyle={{ backgroundColor: "white" }}
                headerStyle={{ backgroundColor: "white", flex: 1 }}
                bodyStyle={{ backgroundColor: "white", flex: 1, borderRadius: 20 }}
                body={

                    <View>

                        {modalShow.item != null ?
                            <View>
                                <TouchableOpacity style={{ padding: 20 }}
                                    onPress={() => {
                                        // props.navigation.navigate("ProfileOther", { uid: modalShow.item.user.uid, username: undefined });
                                        setModalShow({ visible: false, item: null });
                                    }}>
                                    <Text >Profile</Text>
                                </TouchableOpacity>
                                <Divider />
                                {props.route.params.user.uid == "01" ?
                                    <TouchableOpacity style={{ padding: 20 }}
                                        onPress={() => {
                                            setModalShow({ visible: false, item: null });
                                        }}>
                                        <Text >Delete</Text>
                                    </TouchableOpacity>
                                    : null}

                                <Divider />
                                <TouchableOpacity style={{ padding: 20 }} onPress={() => setModalShow({ visible: false, item: null })}>
                                    <Text >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            : null}

                    </View>
                }
            />
            <Snackbar
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>
        </View>
    )
}


export default Post;
