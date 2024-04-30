//
//  CalculatorModule.swift
//  Calculator
//
//  Created by LS-NOTE-00106 on 4/29/24.
//

import Foundation

@objc(CalculatorModule)
class CalculatorModule: NSObject {
  
  @objc(executeCalc:numberA:numberB:resolver:rejector:)
  public func executeCalc(
    _ action: String,
    numberA: Int,
    numberB: Int, 
    resolver: RCTPromiseResolveBlock,
    rejector: RCTPromiseRejectBlock
  ) -> Void {
    if (action == "plus") {
      resolver(numberA + numberB)
      return
    }
    
    if (action == "minus") {
      resolver(numberA - numberB)
      return
    }
    
    if (action == "multiply") {
      resolver(numberA * numberB)
      return
    }
    
    if (action == "divide") {
      resolver(numberA / numberB)
      return
    }
    
    rejector("Unexpected type", action, nil)
  }
}
