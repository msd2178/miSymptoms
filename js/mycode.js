var questions = ["pain",
    "fatigue",
    "difficulty sleeping at night",
    "daytime sleepiness",
    "a fast heart rate",
    "chest pain",
    "difficulty breathing",
    "a poor appetite",
    "an upset stomach",
    "a cough",
    "unusual weight change",
    "urinating at night",
    "swelling in your abdomen, legs or feet",
    "headaches",
    "dizziness",
    "weakness",
    "feeling cold",
    "tremors",
    "feelings of depression",
    "feelings of nervousness/agitation",
    "brain fog",
    "feelings of anxiety",
    "feelings of frustration",
    "feelings of anger",
    "problems with relationships",
    "problems doing daily activities",
    "the need to limit activities",
    "problems with sexual function",
    "how would you say your quality of life is",
    "how would you rate your physical health",
    "how would you rate your mental health, including your mood and ability to think",
    "how would you rate your satisfaction with your social activities and relationships",
    "how well do you carry out your usual social activities and roles"
];

var dict_values = {'Limit activity': 'Need to limit activities', 
'Tremors': 'Tremors', 
'Upset stomach': 'Upset stomach', 
'Relations': 'Problems with relationships', 
'Satisfaction with Social Activities and Relationships': 'Social activities and relationship issues', 
'Urination(N)': 'Urinating at night', 
'Frustration': 'Frustration', 
'Physical Health': 'Physical health issues', 
'Nervousness': 'Feelings of nervousness/agitation', 
'Breathing': 'Difficulty breathing',
'Pain': 'Pain', 
'Brain fog': 'Brain fog', 
'Feeling cold': 'Feeling cold', 
'Weakness': 'Weakness',
'Sleep(Day)': 'Daytime sleepiness', 
'Chest pain': 'Chest pain', 
'Fatigue': 'Fatigue', 
'Sleep(Night)': 'Difficulty sleeping at night', 
'Cough': 'Cough', 
'Anxiety': 'Feelings of anxiety', 
'Quality of Life': 'Quality of life issues', 
'Daily activity': 'Problems doing daily activities', 
'Weight change': 'Unusual weight change', 
'Dizziness': 'Dizziness', 
'Ability to do Social Activities': 'Issues with usual social activities and roles', 
'Mental Health': 'Mental health issues', 
'Racing heart': 'Fast heart rate', 
'Swelling': 'Swelling in abdomen, legs or feet', 
'Anger': 'Feelings of anger', 
'Appetite': 'Poor appetite', 
'Sexual': 'Sexual function issues', 
'Depression': 'Feelings of depression', 
'Headaches': 'Headaches'};

var shortNames = ["Pain",
    "Fatigue",
    "Sleep(Night)",
    "Sleep(Day)",
    "Racing heart",
    "Chest pain",
    "Breathing",
    "Appetite",
    "Upset stomach",
    "Cough",
    "Weight change",
    "Urination(N)",
    "Swelling",
    "Headaches",
    "Dizziness",
    "Weakness",
    "Feeling cold",
    "Tremors",
    "Depression",
    "Nervousness",
    "Brain fog",
    "Anxiety",
    "Frustration",
    "Anger",
    "Relations",
    "Daily activity",
    "Limit activity",
    "Sexual",
    "Quality of Life",
    "Physical Health",
    "Mental Health",
    "Satisfaction with Social Activities and Relationships",
    "Ability to do Social Activities"
];


var responses = [{
    "name": "symptoms",
    "children": [{
        "name": "Physical",
        "children": []
    }, {
        "name": "Mental",
        "children": []
    }, {
        "name": "Social",
        "children": []
    }]
}];

var globalResponses = [{
    "name": "symptoms",
    "children": [{
        "name": "Global",
        "children": []
    }]
}];


var chosen_avatar;

var sevenResponses = [];
var tmpdate = new Date();
var today = tmpdate.toDateString().split(" "); //Simplify the date format and split into diff elements
var monthNum = new Date(Date.parse(today[1] + " 1, " + today[3])).getMonth();


/*Since we do not yet have a database, we populate prev 6 days values and then add todays values upon answering */
/* When database available, read the values upon page load and use */
for (var i = 0; i < shortNames.length; i++) {
    var oneSymptomAllResponses = {
        type: "line",
        lineThickness: 3,
        axisYType: "secondary",
        showInLegend: true,
        name: shortNames[i],
        dataPoints: []
    };

    for (var j = 6; j > 0; j--) {
        oneSymptomAllResponses.dataPoints.push({
            x: new Date(today[3], monthNum, today[2] - j),
            y: randomIntFromInterval(0, 5)
        });
    }
    sevenResponses.push(oneSymptomAllResponses);
}

//A list for keeping track of checked items
var checked_items = [];

var index = 0;
var answers = [];

function myFunction() {

    var eleid;
    if (index > 27) {
        eleid = "goption";
    }
    else {
        eleid = "option";
    }
    if ($('input[name="' + eleid + '"]:checked').size() > 0) {
        var pickedVal = $('input[name="' + eleid + '"]:checked').val();
    }
    else {
        $("#ErrorMsg").css("visibility", "visible");
        return;
    }

    if (answers[index] != undefined) {
        if (index <= 17) {
            responses[0].children[0].children[index].size = pickedVal;
        }
        else if (index > 17 && index <= 23) {
            responses[0].children[1].children[index - 18].size = pickedVal;
        }
        else if (index > 23 && index <= 26) {
            responses[0].children[2].children[index - 24].size = pickedVal;
        }
        else if (index == 27) {
            responses[0].children[0].children[index - 9].size = pickedVal;
            //Sexual Issues question belongs to Physical
        }
        else if (index > 27) {
            //Global Questions. Populate a different JSON
            globalResponses[0].children[0].children[index - 28].size = pickedVal;
        }
    }
    else {

        var tmp = {
            "name": shortNames[index],
            "size": pickedVal
        }
        if (index <= 17) {
            responses[0].children[0].children.push(tmp);
        }
        else if (index > 17 && index <= 23) {
            responses[0].children[1].children.push(tmp);
        }
        else if (index > 23 && index <= 26) {
            responses[0].children[2].children.push(tmp);
        }
        else if (index == 27) {
            responses[0].children[0].children.push(tmp);
        }
        else if (index > 27) {
            //Global Questions
            globalResponses[0].children[0].children.push(tmp);
        }

        answers[index] = pickedVal;
    }


    var dplen = 7;
    if (sevenResponses[index].dataPoints[dplen - 1] != undefined && sevenResponses[index].dataPoints[dplen - 1].x == new Date(today[3], monthNum, today[2])) {
        sevenResponses[index].dataPoints.pop();
    }
    sevenResponses[index].dataPoints.push({
        x: new Date(today[3], monthNum, today[2]),
        y: parseInt(pickedVal, 10)
    });
    if (sevenResponses[index].dataPoints.length >= 8) {
        sevenResponses[index].dataPoints.shift();
    }



    if (index == questions.length - 1) //Change to the number of the last slide questions.length - 1
    {
        $('#q_root').css("display", "none");
        $('#question').html("Congratulations! You are done. Please check your summary.");
        $('#ErrorMsg').css("display", "none");
        $('#answer').css("display", "none");
        $('#answerg').css("display", "none");
        $('#BtnsDiv').css({ 'position': 'fixed', 'bottom': '5px'});
        $("#GetGraphs").css("display", "block");
        $("#NextBtn").css("display", "none");
        $("#BackBtn").css("display", "none");
        return;
    }


    var q = questions[++index] + "?";
    if (index > 27) {
        $("#q_root").html("In general...");
        $("#answer").css("display", "none");
        $("#answerg").css("display", "table");
        eleid = "goption";
    }
    else {
        if (index == 27)
            $("#q_root").html("In the past month have you experienced...");
        else
            $("#q_root").html("In the past week how bothered were you by...");
        $("#answer").css("display", "table");
        $("#answerg").css("display", "none");
        eleid = "option";
    }

    $("#question").html(q);
    if (answers[index] == undefined) {
        var ele = document.getElementsByName(eleid);
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
    }
    else {
        var ele = document.getElementsByName(eleid);
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
        ele[answers[index]].checked = true;
    }
    
    var srcstr1 = './images/' + chosen_avatar + '/' + chosen_avatar + '_' + Math.floor(Math.random()*19 + 1) + '.png';
    $('#myAvatar').attr("src", srcstr1);

    $("#ErrorMsg").css("visibility", "hidden");

if(index == 32){
    console.log(responses);
}

}


function backFunction() {

    index--;
    var eleid;
    if (index >= 0) {
        if (index > 27) {
            $("#q_root").html("In general...");
            $("#answer").css("display", "none");
            $("#answerg").css("display", "table");
            eleid = "goption";
        }
        else {
            if (index == 27)
                $("#q_root").html("In the past month have you experienced...");
            else
                $("#q_root").html("In the past week how bothered were you by...");
            $("#answer").css("display", "table");
            $("#answerg").css("display", "none");
            eleid = "option";
        }
        var q = questions[index] + "?";
        document.getElementById("question").innerHTML = q;
        var ele = document.getElementsByName(eleid);
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
        ele[answers[index]].checked = true;

        $("#ErrorMsg").css("visibility", "hidden");
        var srcstr1 = './images/' + chosen_avatar + '/' + chosen_avatar + '_' + Math.floor(Math.random()*19 + 1) + '.png';
        $('#myAvatar').attr("src", srcstr1);

    }
    else {
        index++;
    }
}


function generateDoctorsPad(data) {
    var i, check;
    // console.log(data);
    $('#physical').empty();
    $('#mental').empty();
    $('#social').empty();
    for (i = 0; i < data.children[0].children.length; i++) {
        if (data.children[0].children[i].size > 2) {
            if (checked_items.indexOf(data.children[0].children[i].name) != -1) {
                check = 'checked="checked"';
            }
            else {
                check = '';
            }
            if (data.children[0].children[i].size == 5)
                $('#physical').prepend('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="physical' + i + '" name="PhysicalBoxes" value="' + data.children[0].children[i].name + '" ' + check + '></input>' + dict_values[data.children[0].children[i].name] + '</label><br />');
            else
                $('#physical').append('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="physical' + i + '" name="PhysicalBoxes" value="' + data.children[0].children[i].name + '" ' + check + '></input>' + dict_values[data.children[0].children[i].name] + '</label><br />');
        }
    }
    for (i = 0; i < data.children[1].children.length; i++) {
        if (data.children[1].children[i].size > 2) {
            if (checked_items[0] != undefined && checked_items.indexOf(data.children[1].children[i].name) != -1) {
                check = 'checked="checked"';
            }
            else {
                check = '';
            }
            if (data.children[1].children[i].size == 5)
                $('#mental').prepend('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="mental' + i + '" name="MentalBoxes" value="' + data.children[1].children[i].name + '" ' + check + '></input>' + dict_values[data.children[1].children[i].name] + '</label><br />');
            else    
                $('#mental').append('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="mental' + i + '" name="MentalBoxes" value="' + data.children[1].children[i].name + '" ' + check + '></input>' + dict_values[data.children[1].children[i].name] + '</label><br />');
        }
    }
    for (i = 0; i < data.children[2].children.length; i++) {

        if (data.children[2].children[i].size > 2) {

            if (checked_items.indexOf(data.children[2].children[i].name) != -1) {
                check = 'checked="checked"';
            }
            else {
                check = '';
            }
            if (data.children[2].children[i].size == 5)
                $('#social').prepend('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="social' + i + '" name="SocialBoxes" value="' + data.children[2].children[i].name + '" ' + check + '></input>' + dict_values[data.children[2].children[i].name] + '</label><br />');
            else
                $('#social').append('<label class="checkbox-label"><input type="checkbox" class="checkboxes" id="social' + i + '" name="SocialBoxes" value="' + data.children[2].children[i].name + '" ' + check + '></input>' + dict_values[data.children[2].children[i].name] + '</label><br />');
        }
    }
}




function generateBubbleGraph(data) {
    console.log("In Generate Bubble Graph");
    var format = d3.format(",d"),
        color = d3.scale.ordinal().range(['#6699FF', '#FFCC00', '#5CD65C', '#d68828', '#9067bd']);//d3.scale.category10();

    var width = $("#svgDivBubble").width() - 20;
    var height = $("#svgDivBubble").height();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(5);

    $("#svgDivBubble").empty();
    $("#svgDivBubble").html('<div style="display: inline-block;"><span style="color: #6699FF; font-weight: bolder;">Physical</span>&nbsp;&nbsp;&nbsp;' + 
    '<span style="color: #FFCC00; font-weight: bolder;">Thoughts and feelings</span>&nbsp;&nbsp;&nbsp;' + 
    '<span style="color: #5CD65C; font-weight: bolder;">Social</span></div>');
    var svg = d3.select("#svgDivBubble").append("svg")
        .attr("style", "width: 100%; height: 90%; margin: 0 auto; display: inline-block; font-size: 12px;")
        .attr("class", "bubble");

    
    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(data))
            .filter(function(d) {
                return !d.children;
            }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            var elem = document.getElementById("svgDivBubble");
            if (elem.getBoundingClientRect) {
                var rect = elem.getBoundingClientRect();
                var svgx = (rect.right - rect.left) / 2;
                var svgy = (rect.bottom - rect.top) / 2;
                var mydx, mydy;
    
                if (d.x < svgx) {
                    mydx = d.x - 1*(svgx-d.x);
                }
                else {
                    mydx = d.x - 1*(svgx-d.x);
                }
                if (d.y < svgy) {
                    mydy = d.y - (svgy-d.y)/6 + 18;
                }
                else {
                    mydy = d.y - (svgy-d.y)/5 + 22;
                }

                return "translate(" + mydx + "," + mydy + ")";
            }

        });

    node.append("title")
        .text(function(d) {
            var newVal = d.value;
            return d.className + ": " + format(newVal);
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r + d.value * d.value - 2.5*d.value;
        })
        .style("fill", function(d) {
            return color(d.packageName);
        });

    node.append("text")
        .attr("dy", ".3em")
        .attr("style", "text-anchor: middle; fill: black;")
        .text(function(d) {
            return d.className.substring(0, d.r);
        });


    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
        var classes = [];

        function recurse(name, node) {
            if (node.children) node.children.forEach(function(child) {
                recurse(node.name, child);
            });
            else {

                if (parseInt(node.size, 10) > 2) {
                    classes.push({
                        packageName: name,
                        className: node.name,
                        value: node.size
                    });
                }
            }
        }

        recurse(null, root);
        return {
            children: classes
        };

    }
    d3.select(self.frameElement).style("height", "100%");
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateLineGraph(responseData) {
    console.log(sevenResponses);
    var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: false,
        animationEnabled: false,
        title: {
            text: "Historical symptom variation"
        },
        axisX: {
            valueFormatString: "DD MMM",
            interval: 1
        },
        axisY2: {
            valueFormatString: 0,
            maximum: 5,
            interval: 1,
            interlacedColor: "#F5F5F5",
            gridColor: "#D7D7D7",
            tickColor: "#D7D7D7"
        },
        theme: "theme1",
        toolTip: {
            shared: true
        },
        data: responseData,
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center",
            fontSize: 15,
            fontFamily: "Lucida Sans Unicode",
            cursor: "pointer",
            itemclick: function(e) {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });

    chart.render();
}


function printCharts() {

    $('#svgDivBubble').empty();
    $('#GraphsDiv').css("display", "block");
    $('#GraphTitle').css("display", "table");
    $("#svgDivBubble").css("display", "block");
    generateBubbleGraph(responses[0]);
    $("#DoctorPadContainer").css("display", "block");
    generateDoctorsPad(responses[0]);
    $("#chartContainer").css("display", "block");
    var globalseven = [];
    for (var i=sevenResponses.length-5; i<sevenResponses.length; i++) {
        globalseven.push(sevenResponses[i]);
    }
    generateLineGraph(globalseven);


    var bubblecontainer = $('#svgDivBubble');
    var width = bubblecontainer.width() + 20;
    var height = 2000;
    var printWindow = window.open('', 'PrintMap',
        'width=' + width + ',height=' + height);
    printWindow.document.write('<html><head><title>Summary</title>');
    
    //Append the external CSS file.
    printWindow.document.write('<link href="./css/style.css" rel="stylesheet" type="text/css" />');
    printWindow.document.write('<script type="text/javascript" src="./js/jquery-1.11.1.min.js"></script>');
    printWindow.document.write('<script type="text/javascript" src="./js/jquery.canvasjs.min.js"></script>');
    printWindow.document.write('</head><body>');
    printWindow.document.writeln('<h2>Name:John Smith                       Date: 05/20/2015</h1>');
    // printWindow.document.writeln('<h2>Date: 05/20/2015</h1>');
    printWindow.document.writeln('<h2> Most bothersome symptoms </h2>');
    
    printWindow.document.writeln('<div style="text-align: center;">' + $(bubblecontainer).html() + '</div>');
    printWindow.document.writeln('<br /><br /> <br />');
    printWindow.document.writeln($('#DoctorPadContainer').html());
    printWindow.document.writeln('<img width="' + width + '" height="600px" src="' + $('#chartContainer div canvas')[0].toDataURL() + '" />');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(function() {
        printWindow.focus();
        printWindow.print();
        //printWindow.close();
    }, 500);

    $('#GraphsDiv').css("display", "block");
    $('#GraphTitle').css("display", "table");
    $("#svgDivBubble").css("display", "block");
    $("#DoctorPadContainer").css("display", "none");
    $("#chartContainer").css("display", "none");
}








$(document).ready(function() {
    $('#GetGraphs').on('click', function() {
        $('#GraphTitle').css("display", "table");
        $('#svgDivBubble').empty();
        $('#BtnsDiv').css({ 'position': '', 'bottom': ''});
        $('#q_root').css("display", "none");
        $('#questionsDiv').css("display", "none");
        $('#DoctorPadContainer').css("display", "none");
        $('#chartContainer').css("display", "none");
        $('#GraphsDiv').css("display", "block");
        $('#svgDivBubble').css("display", "block");
        generateBubbleGraph(responses[0]);
        $("#GetGraphs").css("display", "inline-block");
        $('#generateWordTree').css("display", "inline-block");
        $('#generateDocPad').css("display", "inline-block");
        $('#generateLineGraph').css("display", "inline-block");
        $('#PrintReport').css("display", "inline-block");
        $('#logout').css("display", "inline-block");
    });

    $('#generateDocPad').on('click', function() {
        $('#svgDivBubble').css("display", "none");
        $("#wordtree_explicit").css("display", "none");
        $('#chartContainer').css("display", "none");
        $('#GraphsDiv').css("display", "block");
        $('#GraphTitle span').html("Please check the symptoms you would like to discuss with your health care provider");
        $('#GraphTitle').css("display", "table");
        $('#BtnsDiv').css({ 'position': 'fixed', 'bottom': '5px'});
        generateDoctorsPad(responses[0]);
        $('#DoctorPadContainer').css("display", "block");
    });


    $('#generateLineGraph').on('click', function() {
        $('#chartContainer').css("display", "block");
        $('#svgDivBubble').css("display", "none");
        $('#q_root').css("display", "none");
        $('#questionsDiv').css("display", "none");
        $('#DoctorPadContainer').css("display", "none");
        $('#BtnsDiv').css({ 'position': 'fixed', 'bottom': '5px'});
        $("#wordtree_explicit").css("display", "none");
        var globalseven = [];
        for (var i=sevenResponses.length-5; i<sevenResponses.length; i++) {
            globalseven.push(sevenResponses[i]);
        }
        console.log(globalseven);
        generateLineGraph(globalseven);
        $('#GraphTitle span').html("");
        $('#GraphTitle').css("display", "table");
        $('#chartContainer').css("display", "block");
    });

    $('input[type=radio]').on('click', function() {
        myFunction();
    });

    $('#PrintReport').on('click', function() {
        printCharts();
    });


    $(document).on('click', '.checkboxes', function() {
        console.log(checked_items);
        if ($(this).is(':checked')) {
            //Add to the checked list
            checked_items.push($(this).val());
        }
        console.log(checked_items);
    });
    
    
    $('#logout').on('click', function(){
        $('body').empty();
        var srcstr = './images/' + chosen_avatar + '/' + chosen_avatar + '_' + Math.floor(Math.random()*19 + 1) + '.png';
        $('body').append('<div style="display: table; margin: auto; position: absolute; left: 10%; top: 25%;">'
        + '<img src="' + srcstr + '" style="display: inline-block; width: 10vw;" />' + 
        '<span style="font-size: 35px; display: table-cell; vertical-align: middle; word-wrap: break-word;"> You have successfully updated your symptoms. Have a good day! </span></div>');
    });
    
    
    $('.avatars').on('click', function(){
        chosen_avatar = this.id.split(".")[0];
        console.log(chosen_avatar);
        $('.container').css("display", "none");
        $('body').css("background-color", "white");
        $('#main').css("display", "block");
        var srcstr = './images/' + chosen_avatar + '/' + chosen_avatar + '_' + Math.floor(Math.random()*19 + 1) + '.png';
        $('#myAvatar').attr("src", srcstr);
    });
    
    
    $(document).bind('unload',function(e){
        e.preventDefault();
        var url = "login.html";    
        $(location).attr('href',url); 
    });

});
