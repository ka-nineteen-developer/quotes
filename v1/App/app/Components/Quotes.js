import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Linking,
    Image,
    Dimensions,
    ToastAndroid,
    ImageBackground,
    Share,
    Clipboard,
    AsyncStorage,
    Alert,
    FlatList,
    BackHandler
} from 'react-native';
import {
    Container,
    Left,
    Header,
    Button,
    Title,
    DeckSwiper,
    Card,
    CardItem,
    Body,
    Icon,
    Right,
    List,
    Spinner,
} from 'native-base';
import { quotesList, appUpdate } from '../dataService';
import { baseDetails } from '../baseDetails';
import Banner from '../bannerAd.js';
import InternetCheck from '../InternetCheck';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Google analytics
import {
    GoogleAnalyticsTracker,
    GoogleTagManager,
    GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
let tracker1 = new GoogleAnalyticsTracker("UA-130489978-1");
tracker1.trackScreenView("Quotes");
GoogleAnalyticsSettings.setDispatchInterval(30);

import {
    AdMobInterstitial,
    PublisherBanner,
} from 'react-native-admob';

export default class Quotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    render() {
        return (
            <ImageBackground
                source={
                    require('../assets/img/bg-img.png')
                }
                style={{
                    width: '100%',
                    height: '100%',
                    resize: 'cover'
                }}>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <InternetCheck />
                    <Header style={{ backgroundColor: '#24292e00' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='md-menu' style={{ color: "#ffffff" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{
                                color: "#ffffff",
                                fontFamily: 'LemonJellyPersonalUse',
                                fontSize: 35,
                                lineHeight: 30
                                }}>
                                Quotes
                        </Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.shareApp()}>
                                <Icon name='share' style={{ color: "#ffffff" }} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{
                        flex: 1,
                    }}>
                        {this.state.showRefreshButton ?
                            <View style={{
                                flexDirection: 'column',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity onPress={() => this.getQuotes()}>
                                    <Icon name='refresh' style={{ color: "#ffffff", fontSize: 40 }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{
                                paddingTop: 30
                            }}>
                                {this.state.quotes ?
                                    <DeckSwiper
                                        dataSource={this.state.quotes}
                                        looping={true}
                                        onSwipeRight={() => this.swipped()}
                                        onSwipeLeft={() => this.swipped()}
                                        renderItem={(item) =>
                                            <View style={{
                                                paddingHorizontal: 35,
                                            }}>
                                                <View style={{
                                                    backgroundColor: '#ffffff',
                                                    borderRadius: 5,
                                                    height: screenHeight / 1.5,
                                                }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TouchableOpacity onPress={() => this.copyToClipboard(item)} style={{ padding: 20 }}>
                                                            <Icon name='copy' style={{ color: "#3ab07e" }} />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontStyle: 'italic', color: "#3ab07e", paddingVertical: 20, fontSize: 18 }}>#{item.cat}</Text>
                                                        <TouchableOpacity onPress={() => this.shareQuote(item)} style={{ padding: 20 }}>
                                                            <Icon name='share' style={{ color: "#3ab07e" }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        flex: 0.8,
                                                        paddingHorizontal: 20,
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            textAlign: 'center'
                                                        }}>{item.quote}</Text>
                                                        <Text style={{
                                                            fontSize: 26,
                                                            paddingTop: 10,
                                                            fontFamily: 'LemonJellyPersonalUse',
                                                            color: "#3ab07e",
                                                            textAlign: 'center'
                                                        }}>- {item.author}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    padding: 15
                                                }}>
                                                    <View style={{
                                                        height: 4,
                                                        width: 4,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 6,
                                                        width: 6,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 8,
                                                        width: 8,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 10,
                                                        width: 10,
                                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 8,
                                                        width: 8,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 6,
                                                        width: 6,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                    <View style={{
                                                        height: 4,
                                                        width: 4,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                                        marginHorizontal: 3,
                                                        borderRadius: 100
                                                    }}></View>
                                                </View>
                                            </View>
                                        }
                                    />
                                    :
                                    <Spinner color="#ffffff" />
                                }
                            </View>
                        }
                    </View>
                </View>
                {this.state.appUpdate ? <Banner data={this.state.appUpdate} /> : null}
            </ImageBackground>
        );
    }

    componentDidMount() {

        appUpdate().then(res => {
            this.setState({ appUpdate: res });
            this.getQuotes();
        })

    }

    getQuotes() {
        this.setState({ showRefreshButton: false });
        quotesList().then(res => {
            console.log(res);
            if (res.Status == 'Error') {
                console.log(res);
                ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
                this.setState({ showRefreshButton: true });
            } else {
                this.setState({ quotes: res });
                console.log(this.state.quotes);
                this.setState({ showRefreshButton: false });
            }
        })
    }

    swipped() {
        this.state.count++;
        if (this.state.count > 9) {
            this.showInterstitialAd();
            this.setState({ count: 0 });
        }
    }

    shareQuote(quotes) {
        Share.share(
            {
                message: quotes.quote + ' \n-' + quotes.author + '\n\nDownload Quotes ' + baseDetails.appUrl,
                url: ''
            }).then(result => {

            }).catch(err => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
    }

    copyToClipboard(quotes) {
        Clipboard.setString(quotes.quote + ' \n-' + quotes.author);
        ToastAndroid.show('Quote copied to Clipboard', ToastAndroid.SHORT);

        this.setState({ count: this.state.count + 3 }, () => {
            if (this.state.count > 9) {
                this.showInterstitialAd();
                this.setState({ count: 0 });
            }
        });
    }


    shareApp = () => {
        Share.share(
            {
                message: "Here's my favorite Quotes collection, Check them out " + baseDetails.appUrl,
                url: ''
            }).then(result => {

            }).catch(err => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
    }

    showInterstitialAd() {
        if (this.state.appUpdate.admob.interstitial.showAd) {
            // Display an interstitial
            AdMobInterstitial.setAdUnitID(this.state.appUpdate.admob.interstitial.interstitial_id);
            AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            AdMobInterstitial.requestAd().then(() => {
                AdMobInterstitial.showAd();
            });
        }
    }
}