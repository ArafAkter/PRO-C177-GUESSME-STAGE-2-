let stories = [
    {
        "story_id": "1",
        "inputs": 5,
        "title": "Sports category",
        "story": ` <span class="rep_input">_</span> <span class="rep_input">_</span> <span class="rep_input">_</span>  <span class="rep_input">_</span> <span class="rep_input">_</span>  `,
        "words": ["C", "H", "E", "S", "S"]
    },
    {
        "story_id": "2",
        "inputs": 6,
        "title": "European Country Name",
        "story": ` <span class="rep_input">_</span> <span class="rep_input">_</span> <span class="rep_input">_</span>  <span class="rep_input">_</span> <span class="rep_input">_</span> <span class="rep_input">_</span> `,
        "words": ["F", "R", "A", "N", "C", "E",]
    },
    {
        "story_id": "3",
        "inputs": 6,
        "title": "Something Used For Writing",
        "story": ` <span class="rep_input">_</span> <span class="rep_input">_</span> <span class="rep_input">_</span>  <span class="rep_input">_</span> <span class="rep_input">_</span> <span class="rep_input">_</span> `,
        "words": ["P", "E", "N", "C", "I", "L", ]
    }
]
$(document).ready(function () {
    displayStory();
})
$(function () {
    $(".input_field").keyup(function () {
        let id = $(this).attr("id");
        let input_number = id.split("_")[1]
        $(".rep_input").eq(input_number).html($(this).val());
    })

    $("#submit_story").click(function () {
    let values = []  
    for (let i = 0; i< $(".input_field").length; i++){
        values.push($(".input_field").eq(i).val)
    }
	  
	let data = {
        "story_id": $("#story_id").val(),
        "values": values
        

    }
	  
    $.ajax({
        url:"/post_answers",
        type:"post",
        data:JSON.stringify(data),
        datatype:"json",
        contenttype:'application/json',
        success: function(result)
        {
            $("#result").html(result.result)
            $("#result_container").removeClass("hidden")

        },
        error: function(result){
            alert(result.responceJSON.message)
        }
    })
	  
    })
})



function displayStory() {
    const story = stories[Math.floor(Math.random() * stories.length)];
    $("#story_title").html(story.title)

    $("#bank_words").empty();

    for (let i = 0; i < story.words.length; i++) {
        let html = `<button class="word_bank_button">${story.words[i]}</button>`
        $("#bank_words").append(html)
    }

    $("#input_fields").empty();
    for (let i = 0; i < story.inputs; i++) {
        let input_html = `<input type="text" class="input_field" id="input_${i}" placeholder="Slot ${i + 1}"/>`
        $("#input_fields").append(input_html)
    }

    $("#story_text").html(story.story)
    
    $("#story_id").val(story.story_id)
}