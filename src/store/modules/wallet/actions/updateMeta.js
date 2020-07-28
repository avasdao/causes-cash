/**
 * Update Metadata
 *
 * Metadata is used to store details about addresses.
 *
 * {
 *   "addresses": [{
 *     <address>: {
 *       "label": <string>,
 *       "comment": <string>,
 *       "lock": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "campaignid": <string>,
 *         "createdAt": <datetime>,
 *         "expiresAt": <datetime>
 *       }
 *     }
 *   }],
 * }
 *
 * Metadata is used to store details about coins.
 *
 * {
 *   "coins": [{
 *     <coinid>: {
 *       "label": <string>,
 *       "comment": <string>,
 *       "cashfusion": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "rounds": <integer>,
 *         "createdAt": <datetime>,
 *         "updatedAt": <datetime>
 *       },
 *       "cashshuffle": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "rounds": <integer>,
 *         "createdAt": <datetime>,
 *         "updatedAt": <datetime>
 *       },
 *       "lock": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "campaignid": <string>,
 *         "createdAt": <datetime>,
 *         "expiresAt": <datetime>
 *       }
 *     }
 *   }]
 * }
 */
const updateMeta = ({ commit }, _meta) => {
    /* Commit metadata. */
    commit('setMeta', _meta)
}

/* Export module. */
export default updateMeta
