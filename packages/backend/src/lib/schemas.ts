import * as yup from "yup"
import * as _ from "lodash"

import { ServerConfigs } from "../types"

export const serverConfigSchema = yup.object().shape<ServerConfigs>({
        entryPath: yup.string().required(),
        name: yup.string().required(),
        envs: yup.lazy(obj =>
                yup.object(
                        _.mapValues(obj as object, () => yup.string())
                )
        )
});