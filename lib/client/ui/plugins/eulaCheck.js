/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var bus = ripple('bus');

function _initializeEulaCheck() {
    var width = jQuery(document).width(),
        p = (width / 2) - 277;


    $(".eula-window").show();
    $(".eula-dialog").show().css({left: p + "px"});

    $("#eula-accept").click(function () {
        bus.send("acceptEula", null, function () {
            $(".eula-window").hide();
            $(".eula-dialog").hide();
        });
    });

    $("#eula-decline").click(function () {
        bus.send("disable", null, null);
    });
}

module.exports = {
    initialize: function () {
        //HACK: there has to be a better way!!!
        if ($("#extension-url").val().match(/geelfhphabnejjhdalkjhgipohgpdnoc/)) {
            // do nothing, extension was installed from the Chrome Store
            return;
        }

        bus.send("checkEula", null, function (response) {
            console.log("eula response: ", response.eula);
            if (response.eula === false) {
                _initializeEulaCheck();
            }
        });
    }
};
