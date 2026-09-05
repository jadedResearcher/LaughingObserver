<?php 
function createPendingGuestBookEntry() {
    //html inputs with names post these to this php file
  $entry = [
    "message" => htmlspecialchars($_POST['message'] ?? ''),
    "save-data" => $_POST['save-data'] ?? '',
    "date" => htmlspecialchars($_POST['date'] ?? '???'),
    "website" => htmlspecialchars($_POST['website'] ?? "You passed the test, you're not a particularly stupid bot!")

   ];

   $threshold = 20000;



    if (strlen($entry["date"]) > 100) {
        $entry["date"] = "Too Long :( :( :( Were you trying to break something? Don't make me regret hosting this guestbook :( :( :(";
   }

    if (strlen($entry["message"]) > $threshold) {
        $entry["message"] = "Too Long :( :( :( Were you trying to break something? Don't make me regret hosting this guestbook :( :( :( I'm sorry if you were just being wordy... I'm sorry if you lost it. But I can't safely process that....";
   }

   
    if (strlen($entry["save-data"]) > $threshold) {
        $entry["save-data"] = [];
    }

       if (strlen($entry["message"]) == 0) {
        $entry["message"] = "Did you mean to leave this empty? It's possible it got sanitized cuz it had weird characters in it and php got scared and thought you were trying to hack something. Unlike just normal browser/javascript hacking, php is srs business so be careful, okay?";
   }

   if($_POST['website']){
    return ":( :( :( Usually only particularly stupid bots try to put things in the obvious honeypot hidden form element :( :( :( Your guestbook entry is rejected. Try again without falling for the obivous trap, okay? Pleaes be gentle with my php, I don't want to have to nuke it. Wasting is safe and fun in javascript...less so in server code.";
   }


   //one new file a month
    $fileName = "PendingTestamonials/prayers.txt";
    //will create the file if it doesn't already exist, then append onto it, prevents other things from writing at the same time   
    file_put_contents($fileName, json_encode($entry). PHP_EOL. PHP_EOL. PHP_EOL . ',', FILE_APPEND | LOCK_EX);

// Escaping the variable helps prevent XSS vulnerabilities
    return "<div><h1>Prayer submitted!!!</h1><div><div>date: $entry[date]</div><div>Message: $entry[message]</div><br><br>The Harvest will consider your Prayer.</div><br><br><button onclick='history.back()'>Go Back</button>";
  
}

echo createPendingGuestBookEntry();
?>