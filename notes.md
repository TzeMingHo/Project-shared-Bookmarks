header ( Shared-BookMark)
main
render the page 
 all bookMarks (
 . bookMark title  with link
 . description
 . time  
 . copy URL
 . Like button with counter
 )
 if not message "Clicks add button  to add your first bookmark

 notes 
 render empty page at first 
 render from the newest to oldest (object.sort)
 handle URL copy button (copy to clipboard)


navigator.clipboard.writeText(text) to write  a text in copy/paste buffer for the user .