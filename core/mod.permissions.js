// API Permissions Handling

const frostybot_module = require('./mod.base')
var context = require('express-http-context');

// Permission defaults

const default_perm = {
  'accounts:add': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:delete': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:get': {
    'standard': [
      'core','singleuser',
      'multiuser','user'
    ],
    'provider': []
  },
  'accounts:test': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'cache:flush': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'cache:stats': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'config:get': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token',
      'local'
    ]
  },
  'config:set': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token',
      'local'
    ]
  },
  'gui:enable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'gui:disable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'gui:chart': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:content': {
    'standard': [
      'token',
      'local',
      'remote'
    ],
    'provider': [
      'token',
      'local',
      'remote'
    ]
  },
  'gui:data': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'gui:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:main': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:verify_recaptcha': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'output:status': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'permissions:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:set_type': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:reset': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:set': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'settings:set': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_provider': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:get_providers': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:send': {
    'standard': [
      'providerwhitelist'
    ],
    'provider': [
      'providerwhitelist'
    ]
  },
  'signals:remove_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:balances': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:buy': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:cancel': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:cancelall': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:close': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local',
      'token'
    ]
  },
  'trade:closeall': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local',
      'token'
    ]
  },
  'trade:leverage': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:long': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:market': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:markets': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:order': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:order_history': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:orders': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:pnl': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:position': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:positions': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:sell': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:short': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:stoploss': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:takeprofit': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:tpsl': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:trailstop': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'user:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'user:change_password': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'user:disable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:enable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:log': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:logout': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:multiuser_disable': {
    'standard': [
      'local'
    ],
    'provider': []
  },
  'user:multiuser_enable': {
    'standard': [
      'local'
    ],
    'provider': []
  },
  'user:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:reset': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:disable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:enable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:verify': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  }
}

// Module

module.exports = class frostybot_permissions_module extends frostybot_module {

    // Check permissions for the command for the specified lockdown type

    async check(type, params) {
        params = params.hasOwnProperty('body') ? params.body : params;
        var command = params.hasOwnProperty('command') ? params.command : undefined;
        var ip = context.get('srcIp');

        var acl = {};
        //acl['ip'] = ip;
        
        var uuidparams = await this.user.uuid_from_params(params);
        if (uuidparams != false) {
            acl['core']  = uuidparams.type == 'core'  ? true : false;
            acl['user']  = uuidparams.type == 'user'  ? true : false;
            acl['token'] = uuidparams.type == 'token' ? true : false;
        }

        acl['local'] = ['127.0.0.1','::1','<cluster>'].includes(ip) ? true : false;
        acl['remote'] = !acl.local;
        acl['multiuser'] = await this.user.multiuser_isenabled();
        acl['singleuser'] = !acl.multiuser;

        // If this is a signal, then make sure the provider is whitelisted

        if (String(command).toLocaleLowerCase() == 'signals:send') {
          var provider = params.hasOwnProperty('provider') ? params.provider : undefined;
          if (provider != undefined) {
            acl['providerwhitelist'] = await this.signals.check_ip(provider, ip);
          }
        }
   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }
        var permissions = await this.settings.get('permissions', command, def);
        var perms = [];
        if (permissions.hasOwnProperty(type))
            var perms = permissions[type];
        
        if (Array.isArray(perms)) {
            for (var i = 0; i < perms.length; i++) {
                var check = (perms[i] + ',').split(',').filter((v) => v != '');
                var result = true;
                for (var j = 0; j < check.length; j++) {
                    var entry = check[j];
                    if (!acl.hasOwnProperty(entry) || acl[entry] === false) {
                        result = false;
                        break;
                    }
                }
                if (result === true) {
                    this.output.debug('permission_granted', [type, command, check]);
                    return true;
                }
            }
        }

        this.output.debug('permission_denied', [type, command, perms]);
        this.output.debug('custom_object', ['Required Permissions', perms]);
        this.output.debug('custom_object', ['Current Permissions:', '']);
        this.output.debug(acl);
        return false;
    }

    // Get permissions for the command for the specified lockdown type

    async get(params) {

        var schema = {
            type:  { optional: 'string', format: 'lowercase' },
            cmd:   { options: 'string', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command] = this.utils.extract_props(params, ['type', 'cmd']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }
        var permissions = await this.settings.get('permissions', command);
        if (permissions == null) return def;
        if (type == undefined) {
            if (this.utils.is_object(permissions)) {
                var sorted = {};
                Object.keys(permissions).sort((a,b) => a > b ? 1 : -1).forEach(key => {
                    sorted[key] = permissions[key];
                })
                permissions = sorted;
            }
            return permissions;
        } else {
            if (permissions.hasOwnProperty(type)) {
                return permissions[type];
            }        
        }
        return def; 
    }

    // Add permissions for the command for the specified lockdown type

    async add(params) {

        var schema = {
            type:  { required: 'string', format: 'lowercase' },
            cmd:   { required: 'string', format: 'lowercase' },
            perms: { required: 'string', format: 'lowercase' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command, perms] = this.utils.extract_props(params, ['type', 'cmd', 'perms']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }

        var perms = (perms + ',').replace(/ /g,'')
                     .split(',')
                     .sort((a, b) => (a < b ? -1 : 1))
                     .filter((v) => v != '')
                     .join(',')
        var permissions = await this.settings.get('permissions', command, def);
        if (!permissions.hasOwnProperty(type)) {
            permissions[type] = [];
        }
        if (!permissions[type].includes(perms)) {
            permissions[type].push(perms)
            if (await this.settings.set('permissions', command, permissions)) {
                return this.output.success('permissions_add', [type, command, perms]);
            } else {
                return this.output.error('permissions_add', [type, command, perms]);
            }
        } else {
            return this.output.success('permissions_add', [type, command, perms]);
        }
    }

    // Delete permissions for the command for the specified lockdown type

    async delete(params) {

        var schema = {
            type:  { required: 'string', format: 'lowercase' },
            cmd:   { required: 'string', format: 'lowercase' },
            perms: { required: 'string', format: 'lowercase' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command, perms] = this.utils.extract_props(params, ['type', 'cmd', 'perms']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }


        var perms = (perms + ',').replace(/ /g,'')
                     .split(',')
                     .sort((a, b) => (a < b ? -1 : 1))
                     .filter((v) => v != '')
                     .join(',')
        var permissions = await this.settings.get('permissions', command, def);
        if (!permissions.hasOwnProperty(type)) {
            permissions[type] = [];
        }
        if (permissions[type].includes(perms)) {
            permissions[type] = permissions[type].filter((v) => v != perms);
            if (await this.settings.set('permissions', command, permissions)) {
                return this.output.success('permissions_delete', [type, command, perms]);
            } else {
                return this.output.error('permissions_delete', [type, command, perms]);
            }
        } else {
            return this.output.success('permissions_delete', [type, command, perms]);
        }
    }

    // Set the permission set to use for this Frostybot instance

    async set_type(params) {

      var schema = {
        type:  { required: 'string', format: 'lowercase' },
      }

      if (!(params = this.utils.validator(params, schema))) return false; 

      var type = params.type;

      return await this.settings.set('core', 'permissionset', type);

    }

    // Reset permissions

    async reset() {

      return await this.settings.delete('permissions');

    }




}
