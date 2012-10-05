/*
 * Copyright (C) 2012 Vanderbilt University, All rights reserved.
 * 
 * Author: Miklos Maroti
 */

package org.isis.promise4;

public interface Promise<Type> {
	
	Constant<Type> getConstant();
	
	void reject(Exception error);

	void requestForwarding(Future<Type> parent);

	void requestArgument(short index, Future<?> parent);
}