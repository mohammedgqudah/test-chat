const emojione = require("emojione");
let shortNames = emojione.shortnames;

shortNames += "slightly_smiling_face|";
shortNames += "upside_down_face|";
shortNames += "slightly_smiling_face|";
shortNames += "money_mouth_face|";
shortNames += "face_with_cowboy_hat|";
shortNames += "hugging_face|";
shortNames += "clown_face|";
shortNames += "nerd_face|";
shortNames += "slightly_frowning_face|";
export default {
    ...emojione.emojioneList,
    [":slightly_smiling_face:"]: { uc_base: "1f642" },
    [":upside_down_face:"]: { uc_base: "1f643" },
    [":money_mouth_face:"]: { uc_base: "1f911" },
    [":face_with_cowboy_hat:"]: { uc_base: "1f920" },
    [":hugging_face:"]: { uc_base: "1f917" },
    [":clown_face:"]: { uc_base: "1f921" },
    [":nerd_face:"]: { uc_base: "1f913" },
    [":slightly_frowning_face:"]: {
        uc_base: "1f641"
    },
    [":white_frowning_face:"]: { uc_base: "1f639" },
    [":white_frowning_face:"]: { uc_base: "1f639" },
    [":rolling_on_the_floor_laughing:"]: {
        uc_base: "1f923"
    }
};
export { shortNames };
