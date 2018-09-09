port module Main exposing (main)

import Html exposing (..)


main : Program Model Model Update
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


init : Model -> ( Model, Cmd Update )
init state =
    ( state, Cmd.none )


type Update
    = Update Model


update msg model =
    case msg of
        Update state ->
            ( state, Cmd.none )


port state : (Model -> action) -> Sub action


subscriptions : Model -> Sub Update
subscriptions model =
    Sub.batch
        [ state Update ]


view : Model -> Html Update
view { title, seconds } =
    div []
        [ div []
            [ text title ]
        , div []
            [ text (toString seconds) ]
        ]
