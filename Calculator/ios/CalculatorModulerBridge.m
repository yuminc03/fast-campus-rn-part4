//
//  CalculatorModulerBridge.m
//  Calculator
//
//  Created by LS-NOTE-00106 on 4/30/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalculatorModule, NSObject)
  
RCT_EXTERN_METHOD(executeCalc: (NSString *) action
                  numberA: (int) numberA
                  numberB: (int) numberB
                  resoler: (RCTPromiseResolveBlock) resolve
                  rejector: (RCTPromiseRejectBlock) reject
                  )

@end
