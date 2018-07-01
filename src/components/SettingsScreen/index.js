// @flow

import { connect } from 'react-redux'
import { fetchResource } from '../../ducks/tokens'

import SettingsForm from './SettingsForm'
import { saveSetting } from '../../ducks/settings'
import config from '../../../config'

const mapStateToProps = state => {
  const {
    settings: { baseFiat, minAssetBalance }
  } = state
  return {
    baseFiat,
    minAssetBalance,
    // FIXME this is not state
    baseFiatOptions: config.settings.baseFiatOptions,
    minimumBalanceOptions: config.settings.minimumBalanceOptions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleMinimumBalanceChange: (key: string, value: string) => {
      dispatch(saveSetting(key, value))
    },
    handleBaseFiatValueChange: (key: string, value: string) => {
      dispatch(saveSetting(key, value))
      dispatch(
        fetchResource(
          'fiat',
          `https://exchangeratesapi.io/api/latest?base=${value}`
        )
      )
      for (let i = 0; i < 2; i++) {
        dispatch(
          fetchResource(
            'tokens',
            `https://api.coinmarketcap.com/v2/ticker/?start=${i * 100 +
              1}&limit=100&convert=${value}`
          )
        )
      }
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)