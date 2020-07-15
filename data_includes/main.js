PennController.ResetPrefix(null); //Initiates PennController
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Playmobil_CHN/master/images/")

Sequence( "information", "initRecorder", "prac", "send", "final" )

//PennController.SetCounter( "setcounter" );

newTrial( "information" ,
    newHtml("information_CHN", "information_CHN.html")
        .print()
    ,
    newButton("我同意")
        .settings.center()
        .print()
        .wait()

)

//newTrial("identification" ,
//    newText("请在下方输入您的Prolific ID（请务必输入此ID，否则无法领取报酬）：")
//        .settings.center()
//        .print()
//    ,
//    newTextInput("inputID", "请输入您的Prolific ID")
//        .settings.center()
//        .log()
//        .print()
//    ,
//    newButton("继续")
//        .settings.center()
//        .print()
//        .wait()    
//    ,
//    newVar("ID")
//        .global()
//        .set( getTextInput("inputID") )
//)
//.log( "ID" , getVar("ID") )

InitiateRecorder("http://myserver/saveVoiceRecordings.php", "Please grant the experiment access to your microphone.").label("initRecorder")

newTrial("instruction",
        newText("<p>在该实验中，你会先看见一张图片和一个句子，请大声朗读这个句子，然后点击它。</p><p>接下来你会看见另一张图片，请用一个句子描述图片中的变化，并大声朗读出这个句子，然后点击“继续”按钮。</p>")
            .settings.center()
            .print()
        newButton("开始实验")
            .settings.center()
            .print()
            .wait()
)

Template(
    GetTable("prac.csv")
        .setGroupColumn("List"), variable =>
        newTrial( "prac" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.FirstDisplay)
                .print()
            ,
            newText("sentence", variable.Context)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newImage("two", variable.SecondDisplay)
                .print()
            ,
            newButton("继续")
                .settings.center()
                .print()
                .wait()
            ,
            getVoiceRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"  , variable.List)
  .log( "Item"   , variable.Item   )
  .log( "Box"   , variable.Situation   )
  .log( "Gender"   , variable.Gender   )
  .log( "Context"   , variable.Context   )
  )

SendResults( "send" )

newTrial( "final" ,
    newText("<p>感谢您的参与！</p>")
        .print()
    ,
    newText("<p><a href='https://www.stir.ac.uk' href='_blank'>点击此处结束实验</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)