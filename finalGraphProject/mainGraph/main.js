        var frequency = 5;
        var iframes = ["#byNumberOfCampaigns", "#byMargin", "#byAdvertiser", "#byVertical", "#byProduct", "#byTrafficker", "#byDay"];

        function loopNew(i) {
            // hide previous
            $(iframes[i]).animate({
                left: "1800px"
            }).hide("fast");

            if (i >= iframes.length - 1) {
                i = 0;
            } else {
                i++;
            }

            // show next
            $(iframes[i]).show().animate({
                left: "0px"
            });
            setTimeout(function () {
                loopNew(i);
            }, frequency * 4000);
        }

    		$(document).ready(function(){
        			setTimeout(function(){
        				loopNew(0);
        			}, 200000);
        	});  
