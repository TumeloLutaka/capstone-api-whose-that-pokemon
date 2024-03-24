var counter = 0;

$("#start-game-btn").click(async () => {
    $("#start-game-btn").prop("disabled", true)
    const data = await axios.get("/nextPokemon")
    
    // Get welcome text div and hide it.
    $("#welcome").css("display", "none")
    $(".game").css("display", "flex")
    $("#next-round-btn").css("display", "none")

    // 
    $("img").attr("src", data.data.response.sprites.front_default)
    $("#pokemon").text(`The pokemon is a ${data.data.response.name}`)
    $("#pokemon-answer").val(`${data.data.response.name}`)
    
    $("#answer-btn").prop("disabled", false)
})

// Getting reference to the form and preventing the default submission functionailty to run custom code on submit
$("form").submit((event) => {
    event.preventDefault()

    // Disable answer button
    $("#answer-btn").css("display", "none")
    $("#next-round-btn").css("display", "flex")

    // Enable next round button
    $("#next-round-btn").prop("disabled", false)

    //remove stylings from  feeback-text
    $(".feedback-text-container").css("visibility", "visible")
    $("#feedback-text").removeClass("answer-correct answer-wrong")

    const userAnswer = $("#pokemon-name").val()    
    const correctAnswer = $("#pokemon-answer").val()

    if(userAnswer.trim().toUpperCase() == correctAnswer.toUpperCase()) {
        // Correct answer
        $("#feedback-text").text("Correct!").addClass("answer-correct")

        counter++;
        $("#counter-number").text(counter)
    } 
    else {
        // Wrong answer
        $("#feedback-text").text("Wrong Answer!").addClass("answer-wrong")

        counter = 0
        $("#counter-number").text(counter)
    }
})

$("#next-round-btn").click(async () => {
    console.log("Click")
    // Disable the next round button so mutiple clicks can't occur
    $("#next-round-btn").prop("disabled", true)

    const data = await axios.get("/nextPokemon")
    $(".feedback-text-container").css("visibility", "hidden")
    $("img").attr("src", data.data.response.sprites.front_default)
    $("#pokemon").text(`The pokemon is a ${data.data.response.name}`)
    $("#pokemon-answer").val(`${data.data.response.name}`)
    
    // Restting elements for next guessing round.
    $("#pokemon-name").val('')
    $("#next-round-btn").css("display", "none")
    $("#answer-btn").css("display", "block")
})