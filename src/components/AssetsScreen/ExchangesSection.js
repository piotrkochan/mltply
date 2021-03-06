// @flow

import React from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import { Button, Text, Icon, View, Spinner } from 'native-base'
import { deleteConnection } from '../../ducks/exchanges'
import { removeBySource } from '../../ducks/assets'

import commonColors from '../../native-base-theme/variables/commonColor'
import { AssetsListItem } from '../misc'
import type { ExchangeConnection, ExchangeProps } from '../../ducks/exchanges'

type Props = {
  navigation: Object,
  connections: Array<ExchangeConnection>,
  deleteConnectionAndAssets: Function,
  exchangeProps: Array<ExchangeProps>
}
type State = {}

class Screen extends React.Component<Props, State> {
  render() {
    const {
      connections,
      navigation,
      exchangeProps,
      deleteConnectionAndAssets
    } = this.props
    return (
      <FlatList
        style={{ marginTop: 15 }}
        data={connections}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
          const props = exchangeProps.find(props => props['slug'] === item.slug)
          if (!props) throw new Error(`Missing props of exchange: ${item.slug}`)

          const { name } = props
          const {
            id,
            ui: { error, loading }
          } = item

          return (
            <AssetsListItem>
              <Text style={{ flex: 1 / 6 }}>{name}</Text>
              {error && (
                <Text style={{ color: commonColors.brandDanger }}>{error}</Text>
              )}
              {loading && <Spinner />}
              <View style={{ flexDirection: 'row' }}>
                <Button
                  transparent
                  onPress={() =>
                    navigation.navigate('ExchangeForm', { connection: item })
                  }
                >
                  <Icon type="MaterialCommunityIcons" name="pencil" />
                </Button>
                <Button
                  transparent
                  danger
                  onPress={() => deleteConnectionAndAssets(id)}
                >
                  <Icon type="MaterialCommunityIcons" name="delete" danger />
                </Button>
              </View>
            </AssetsListItem>
          )
        }}
        ListHeaderComponent={
          <Button
            block
            success
            onPress={() => navigation.navigate('ExchangeForm')}
          >
            <Text>Connect an exchange</Text>
            <Icon type="MaterialCommunityIcons" name="plus" />
          </Button>
        }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    connections: state.exchanges.connections,
    exchangeProps: state.exchanges.props
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteConnectionAndAssets: (id: string) => {
      dispatch(deleteConnection(id))
      dispatch(removeBySource(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen)
