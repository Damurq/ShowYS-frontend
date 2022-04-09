import React, { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'

import BottomSheet from 'react-native-bottomsheet-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider, Snackbar } from 'react-native-paper'

import { container, utils } from '../../styles'
import Post from './Post'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFeedPosts } from '../../../redux/actions/index'

import data from '../../../data/data.json'

function Feed(props) {
    const postsStatic = [
        {
            "user": {
                "image": "https://fotomanias.com.ar/wp-content/uploads/2019/03/foto-carnet-fondo-celeste.jpg",
                "uid": "01",
                "name": "Carla"
            },
            "item": {
                "likesCount": 3,
                "type": 1,
                "id": "1",
                "downloadURL": "https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg"
            }
        },
        {
            "user": {
                "image": "https://blankpaper.es/wp-content/uploads/2019/09/Aspectos-a-considerar-para-las-fotos-carnet.jpg",
                "uid": "02",
                "name": "Mig"
            },
            "item": {
                "likesCount": 4,
                "type": 1,
                "id": "2",
                "downloadURL": "https://images.pexels.com/photos/1476880/pexels-photo-1476880.jpeg"
            }
        }]

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [unmutted, setUnmutted] = useState(null)
    const [inViewPort, setInViewPort] = useState(0)
    const [sheetRef, setSheetRef] = useState(useRef(null))
    const [modalShow, setModalShow] = useState({ visible: false, item: null })
    const [isValid, setIsValid] = useState(true);

    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (changed && changed.length > 0) {
            setInViewPort(changed[0].index);
        }
    })

    if (posts.length == 0) {
        return (<View />)
    }

    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                        }}
                    />
                }
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 70
                }}
                numColumns={1}
                horizontal={false}
                data={posts}
                keyExtractor={(item, index) => index.toString()}

                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Post route={{ params: { user: item.user, item, index, unmutted, inViewPort, setUnmuttedMain: setUnmutted, setModalShow, feed: true } }} navigation={props.navigation} />
                    </View>
                )}
            /> 
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
                                        props.navigation.navigate("ProfileOther", { uid: modalShow.item.user.uid, username: undefined });
                                        setModalShow({ visible: false, item: null });
                                    }}>
                                    <Text >Profile</Text>
                                </TouchableOpacity>
                                <Divider />
                                {modalShow.item.creator == "" ?
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


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    feed: store.usersState.feed,
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchFeedPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Feed);
