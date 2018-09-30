port module App exposing (main)

import Html exposing (..)
import Html.Events exposing (..)


main : Program Model Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { title : String
    , seconds : Int
    }


type alias ElmToReactMsg =
    { command : String
    , payload : String
    }


type Msg
    = ReactUpdate Model
    | ElmToReactSender ElmToReactMsg


init : Model -> ( Model, Cmd Msg )
init state =
    ( state, Cmd.none )


update msg model =
    case msg of
        ReactUpdate model ->
            ( model, Cmd.none )

        ElmToReactSender obj ->
            ( model, elmToReact obj )


port reactToElm : (Model -> action) -> Sub action


port elmToReact : ElmToReactMsg -> Cmd a


subscriptions : Model -> Sub Msg
subscriptions model =
    reactToElm ReactUpdate


view : Model -> Html Msg
view { title, seconds } =
    div []
        [ div []
            [ text title ]
        , div []
            [ text (toString seconds) ]
        , button
            [ onClick
                (ElmToReactSender
                    (ElmToReactMsg "add100" "")
                )
            ]
            [ text "Add 100" ]
        ]
