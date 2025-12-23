import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 24,
        color: '#fff',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 16,
        backgroundColor: '#56545a',
        overflow: 'hidden',
        marginBottom: 24,
        width: '100%',
    },
    itemHeader: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    itemContent: {
        padding: 24,
    },
    itemDescription: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 16,
    },
    uploadContainer: {
        marginTop: 12,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#007aff',
        borderRadius: 8,
        minWidth: 90,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 8,
        maxWidth: 200,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#555',
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: '#fff',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

