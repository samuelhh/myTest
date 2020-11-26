import camelCase from 'lodash/camelCase'

/**
 * 合并store下的 modules
 */
const req = require.context('@/store/modules', false, /\.js$/);
const storeModules = {};

req.keys().forEach(item => {
    const fileName = item.slice(2, -3)
    const module_name = camelCase(fileName)
    const module_config = req(item).default
    storeModules[module_name] = {
        ...module_config,
    }
});

export default storeModules