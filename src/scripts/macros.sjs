let var = macro {
  case { _ ( $($v = $ex:expr) (;) ... ) } => {
    return #{ var $($v = $ex) (,) ... }
  }
  case { _ ${$ident = $exp:expr } (,) ... } => {
    return #{ var $($ident = $exp) (,) ... }
  }
}
export var; 
